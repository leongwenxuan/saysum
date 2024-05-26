import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import styles from '../styles/homeStyles';
import RecordExpense from '../Components/recordExpense';
import CategoryGpt from '../Components/categoryGpt';
import { TranscriptionProvider } from '../contexts/TranscriptionContext';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useAppContext } from '../contexts/context';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const { setCurrentStep } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    const url = 'http://172.20.10.11:5011/users';
    axios.get(url)
      .then(response => {
        const users = response.data;

        if (!users || users.length === 0) {
          // If data is null or empty, navigate to languageSelect
          setCurrentStep('languageSelect');
          router.replace('/languageSelect');
          return;
        }

        // Process category data
        const categoryData = [];
        users.forEach(user => {
          for (const category in user.items) {
            user.items[category].forEach(item => {
              categoryData.push({
                id: `${user.user_id}-${category}-${item.name}`,
                category: category,
                amount: `$${item.price.toFixed(2)}`,
                date: new Date(item.date), // Ensure date is processed correctly
                icon: getCategoryIcon(category), // Function to get icon based on category
                color: getCategoryColor(category) // Function to get color based on category
              });
            });
          }
        });

        // Sort category data by most recent date
        categoryData.sort((a, b) => b.date - a.date);

        // Process monthly data
        const monthlyData = users.map(user => ({
          id: user.user_id,
          month: user.monthly_spending.month,
          amount: `$${user.monthly_spending.overall_spent.toFixed(2)}`,
          isActive: user.monthly_spending.month === 'April' // Example logic for active month
        }));

        setCategories(categoryData);
        setMonthly(monthlyData);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        // Handle error and navigate to languageSelect if necessary
        setCurrentStep('languageSelect');
        router.replace('/languageSelect');
      });
  }, []);

  const getCategoryIcon = (category) => {
    // Return appropriate icon for each category
    const icons = {
      Clothes: '👕',
      Gadgets: '📱',
      Food: '🍔',
      Travel: '✈️',
      Transportation: '🚗',
      Personal: '🧴'
    };
    return icons[category] || '❓';
  };

  const getCategoryColor = (category) => {
    // Return appropriate color for each category
    const colors = {
      Clothes: '#FF6347',
      Gadgets: '#20B2AA',
      Food: '#FFD700',
      Travel: '#87CEEB',
      Transportation: '#FFA500',
      Personal: '#32CD32'
    };
    return colors[category] || '#000';
  };

  const renderCategoryItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{item.icon}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.amount}>{item.amount}</Text>
      </View>
      <View style={[styles.indicator, { backgroundColor: item.color }]} />
    </View>
  );

  const handleMonthSpent = (item) => {
    router.push('/monthspent', { month: item.month, amount: item.amount });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.title}>SaySum</Text>
          <Text style={styles.subtitle}>Monthly Spent</Text>
          
          <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false} 
            contentContainerStyle={styles.monthlyContainerContent}
          >
            {monthly.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[styles.monthBox, !item.isActive && styles.inactiveMonthBox]} 
                onPress={() => handleMonthSpent(item)}
              >
                <View>
                  <Text style={[styles.monthText, !item.isActive && styles.inactiveMonthText]}>{item.month}</Text>
                  <Text style={[styles.amountText, !item.isActive && styles.inactiveAmountText]}>{item.amount}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TranscriptionProvider>
          <RecordExpense />
          <CategoryGpt />
        </TranscriptionProvider>

        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
    </View>
  );
}
