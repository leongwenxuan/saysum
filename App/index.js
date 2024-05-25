import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, SafeAreaView} from 'react-native';
import styles from '../styles/homeStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';

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
  { id: '3', month: 'Jul', amount: '$1,600.00', isActive: false },
];

export default function App() {
  const router = useRouter();
  const params = useLocalSearchParams();

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

  const handleMonthSpent = (item) => {
    router.push('monthspent', { month: 'June', amount: '$1,200.00' });
  }


  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>

  );
}

