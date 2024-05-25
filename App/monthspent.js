import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MonthSpentScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="#3558FF" />
      </TouchableOpacity>
      <Text style={styles.title}>Monthly Spent</Text>
      <View style={styles.overallContainer}>
        <Text style={styles.overallTitle}>Overall in May</Text>
        <Text style={styles.overallAmount}>$3,500.00</Text>
        <Text style={styles.overallPercentage}>15%</Text>
      </View>
      <View style={styles.chartContainer}>
        <View style={styles.chartBar}>
          <View style={styles.week1} />
          <Text>Week 1</Text>
        </View>
        <View style={styles.chartBar}>
          <View style={styles.week2} />
          <Text>Week 2</Text>
        </View>
        <View style={styles.chartBar}>
          <View style={styles.week3} />
          <Text>Week 3</Text>
        </View>
        <View style={styles.chartBar}>
          <View style={styles.week4} />
          <Text>Week 4</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.cardIcon} />
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardAmount}>$875.23</Text>
          <Text style={styles.cardLabel}>Weekly Spent (average)</Text>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardAmount}>$3,000.00</Text>
          <Text style={styles.cardLabel}>Budget Goal</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  overallContainer: {
    backgroundColor: '#3558FF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  overallTitle: {
    fontSize: 16,
    color: '#fff',
  },
  overallAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  overallPercentage: {
    fontSize: 16,
    color: '#fff',
    position: 'absolute',
    right: 20,
    top: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  chartBar: {
    alignItems: 'center',
  },
  week1: {
    height: 40,
    width: 20,
    backgroundColor: '#3558FF',
    marginBottom: 5,
  },
  week2: {
    height: 60,
    width: 20,
    backgroundColor: '#3558FF',
    marginBottom: 5,
  },
  week3: {
    height: 50,
    width: 20,
    backgroundColor: '#3558FF',
    marginBottom: 5,
  },
  week4: {
    height: 80,
    width: 20,
    backgroundColor: '#3558FF',
    marginBottom: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    height: 20,
    width: 20,
    backgroundColor: '#3558FF',
    borderRadius: 10,
    marginRight: 20,
  },
  cardTextContainer: {
    marginLeft: 10,
  },
  cardAmount: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  cardLabel: {
    fontSize: 16,
    color: '#777',
  },
});
