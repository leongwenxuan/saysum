import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import styles from '../styles/homeStyles';
import RecordExpense from '../Components/recordExpense';
import axios from 'axios';
import { useRouter } from 'expo-router';

export default function App() {
  const [categories, setCategories] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const url = 'http://192.168.80.249:5011/users';
    axios.get(url)
      .then(response => {
        const users = response.data;
        
        // Process category data
        const categoryData = [];
        users.forEach(user => {
          for (const category in user.items) {
            user.items[category].forEach(item => {
              categoryData.push({
                id: `${user.user_id}-${category}-${item.name}`,
                category: category,
                amount: `$${item.price.toFixed(2)}`,
                icon: getCategoryIcon(category), // Function to get icon based on category
                color: getCategoryColor(category) // Function to get color based on category
              });
            });
          }
        });

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
    router.push('monthspent', { month: item.month, amount: item.amount });
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

        <RecordExpense />

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
