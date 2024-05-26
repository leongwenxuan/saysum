import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const ConfirmationPage = () => {
  const { transcription } = useLocalSearchParams();
  const router = useRouter();

  const handleYes = async () => {
    console.log('Confirmed transcription:', transcription);
    router.back();
  };

  const handleNo = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Did we interpret it correctly?</Text>
      <Text style={styles.transcription}>{transcription}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleYes}>
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNo}>
          <Text style={styles.buttonText}>No, try again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3558FF', // Blue background color
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  question: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  transcription: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#1E90FF',
  },
});

export default ConfirmationPage;
