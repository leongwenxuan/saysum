import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppContext } from '../contexts/context';

const LanguageSelection = () => {
  const { setCurrentStep } = useAppContext();
  const router = useRouter();

  const handleLanguageSelect = () => {
    setCurrentStep('budgetSetup');
    router.replace('/budgetSetup'); // Use absolute path
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your language</Text>
      {['English', '中文', 'Bahasa Melayu', 'தமிழ் மொழி'].map((language) => (
        <TouchableOpacity
          key={language}
          style={styles.button}
          onPress={handleLanguageSelect}
        >
          <Text style={styles.buttonText}>{language}</Text>
        </TouchableOpacity>
      ))}
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
  button: {
    width: 200,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
  },
});

export default LanguageSelection;
