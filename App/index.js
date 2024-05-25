import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../styles/homeStyles';
import { LinearGradient } from 'expo-linear-gradient';

const categoryData = [
  { id: '1', category: 'Clothes', amount: '$1,500.00', icon: '👕', color: '#FF6347' },
  { id: '2', category: 'Gadgets', amount: '$1,500.00', icon: '📱', color: '#20B2AA' },
  { id: '3', category: 'Food', amount: '$1,500.00', icon: '🍔', color: '#FFD700' },
  { id: '4', category: 'Travel', amount: '$1,500.00', icon: '✈️', color: '#87CEEB' },
  { id: '5', category: 'Transportation', amount: '$1,500.00', icon: '🚗', color: '#FFA500' },
  { id: '6', category: 'Personal Care', amount: '$1,500.00', icon: '🧴', color: '#32CD32' },
  { id: '7', category: 'Clothes', amount: '$1,500.00', icon: '👕', color: '#FF6347' },
];

const monthlyData = [
  { id: '1', month: 'May', amount: '$1,500.00', isActive: true },
  { id: '2', month: 'Jun', amount: '$1,200.00', isActive: false },
];

export default function App() {
  const [categories, setCategories] = useState(categoryData);
  const [monthly, setMonthly] = useState(monthlyData);

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SaySum</Text>
        <Text style={styles.subtitle}>Monthly Spent</Text>
        
        <ScrollView 
          horizontal={true} 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.monthlyContainerContent}
        >

          {monthlyData.map((item) => (
            <TouchableOpacity key={item.id} style={[styles.monthBox, !item.isActive && styles.inactiveMonthBox]}>
              <View>
                <Text style={[styles.monthText, !item.isActive && styles.inactiveMonthText]}>{item.month}</Text>
                <Text style={[styles.amountText, !item.isActive && styles.inactiveAmountText]}>{item.amount}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.holdButtonContainer}>
        <TouchableOpacity style={styles.holdButton}>
          <LinearGradient
            colors={['#3558FF', 'transparent']}
            style={styles.holdButtonGradient}
            start={{ x: 0.5, y: 0.5 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.holdText}>Hold to SaySum...</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}
