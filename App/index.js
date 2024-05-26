import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import styles from '../styles/homeStyles';
import RecordExpense from '../Components/recordExpense';
import { TranscriptionProvider } from '../contexts/TranscriptionContext';
import { useRouter } from 'expo-router';
// import { useAppContext } from '../contexts/context';

export default function App() {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Hardcoded data
    const initialUsers = [
      {
        user_id: '1',
        name: 'John Doe',
        languages: [{ language: 'English' }],
        budget: 1000,
        monthly_spending: [
          {
            month: 'April',
            overall_spent: 750.75,
            percentage_overbudget: 25.08,
            weekly_spending: [
              { week: 1, spent: 200 },
              { week: 2, spent: 150 },
              { week: 3, spent: 250 },
              { week: 4, spent: 150 },
            ],
            budget_goal: 800,
          },
          {
            month: 'March',
            overall_spent: 600.50,
            percentage_overbudget: 0,
            weekly_spending: [
              { week: 1, spent: 150 },
              { week: 2, spent: 200 },
              { week: 3, spent: 100 },
              { week: 4, spent: 150 },
            ],
            budget_goal: 800,
          },
          {
            month: 'February',
            overall_spent: 900.25,
            percentage_overbudget: 12.53,
            weekly_spending: [
              { week: 1, spent: 300 },
              { week: 2, spent: 200 },
              { week: 3, spent: 250 },
              { week: 4, spent: 150 },
            ],
            budget_goal: 800,
          },
        ],
        items: {
          Clothes: [
            { name: 'Shirt', price: 29.99, date: new Date('2023-04-15') },
            { name: 'Jeans', price: 49.99, date: new Date('2023-04-20') },
            { name: 'Jacket', price: 89.99, date: new Date('2023-04-25') },
          ],
          Gadgets: [
            { name: 'Phone', price: 699.99, date: new Date('2023-04-10') },
            { name: 'Tablet', price: 299.99, date: new Date('2023-04-18') },
          ],
          Food: [
            { name: 'Burger', price: 9.99, date: new Date('2023-04-05') },
            { name: 'Pizza', price: 12.99, date: new Date('2023-04-12') },
            { name: 'Coffee', price: 4.99, date: new Date('2023-04-22') },
          ],
          Travel: [
            { name: 'Flight', price: 199.99, date: new Date('2023-04-20') },
            { name: 'Hotel', price: 150.00, date: new Date('2023-04-22') },
          ],
          Transportation: [
            { name: 'Taxi', price: 25.00, date: new Date('2023-04-15') },
            { name: 'Bus', price: 2.50, date: new Date('2023-04-10') },
          ],
          Personal: [
            { name: 'Shampoo', price: 5.99, date: new Date('2023-04-15') },
            { name: 'Toothpaste', price: 3.49, date: new Date('2023-04-20') },
            { name: 'Perfume', price: 59.99, date: new Date('2023-04-25') },
          ],
        },
      },
    ];

    setUsers(initialUsers);
    updateCategories(initialUsers);
    updateMonthly(initialUsers);
  }, []);

  const updateCategories = (users) => {
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
    categoryData.sort((a, b) => b.date - a.date);
    setCategories(categoryData);
  };

  const updateMonthly = (users) => {
    const monthlyData = users.flatMap(user =>
      user.monthly_spending.map(month => ({
        id: `${user.user_id}-${month.month}`,
        month: month.month,
        amount: `$${month.overall_spent.toFixed(2)}`,
        isActive: month.month === 'April', // Example logic for active month
      }))
    );
    setMonthly(monthlyData);
  };

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

  const handleExpenseUpdate = (transcription) => {
    console.log('Confirmed transcription:', transcription);

    // Hardcoded lunch expense
    const lunchExpense = {
      name: 'Lunch',
      price: 5.00,
      date: new Date().toISOString(),
    };

    // Update the users state
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.map(user => {
        if (user.user_id === '1') { // Assuming we're updating the user with ID '1'
          const updatedItems = { ...user.items };
          updatedItems.Food = [...updatedItems.Food, lunchExpense];
          return { ...user, items: updatedItems };
        }
        return user;
      });
      updateCategories(updatedUsers);
      updateMonthly(updatedUsers);
      return updatedUsers;
    });

    // Redirect to confirmation page
    router.push({
      pathname: '/confirmation',
      params: { transcription }
    });
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
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
          <RecordExpense onUpdate={handleExpenseUpdate} />
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


