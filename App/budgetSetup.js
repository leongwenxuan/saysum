import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../contexts/context';
import axios from 'axios';
import uuid from 'react-native-uuid'; // Import react-native-uuid

const BudgetSetup = () => {
  const [budget, setBudget] = useState('');
  const { setCurrentStep } = useAppContext();
  const router = useRouter();

  const handleBudgetSubmit = async () => {
    try {
      const user = {
        user_id: 1, // Generate a unique user ID
        name: 'User Name', // Set the user name
        languages: [{ language : 'English' }], // Set the user languages
        budget: 5000.00,
        monthly_spending: {
          month: 'May', // Set the current month
          overall_spent: 0,
          percentage_overbudget: 0,
          weekly_spending: [
            { week: 1, spent: 0 },
            { week: 2, spent: 0 },
            { week: 3, spent: 0 },
            { week: 4, spent: 0 }
          ],
          budget_goal: Number(budget)
        },
        items: {
          Clothes: [],
          Gadgets: [],
          Food: [],
          Travel: [],
          Personal: []
        }
      };
      console.log(user.budget)
      // Ensure the URL matches the endpoint defined in your backend
      // await axios.post('http://172.20.10.11:5011/addTestData', user);
      await axios.patch('http://172.20.10.11:5011/addUser', user);

      setCurrentStep('index');
      router.push('/'); // Use absolute path
    } catch (error) {
      console.error('Error submitting budget:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set your Monthly Budget Goal</Text>
      <TextInput
        style={styles.budgetInput}
        keyboardType='numeric'
        placeholder='$0'
        value={budget}
        onChangeText={setBudget}
      />
      <TouchableOpacity style={styles.nextButton} onPress={handleBudgetSubmit}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  budgetInput: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    textAlign: 'center',
    width: '80%',
  },
  nextButton: {
    marginTop: 40,
    backgroundColor: '#4285F4',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 10,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BudgetSetup;
