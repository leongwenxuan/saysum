import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const ConfirmationPage = () => {
  const { transcription } = useLocalSearchParams();
  const router = useRouter();

  const handleYes = async () => {
    console.log('Confirmed transcription:', transcription);

    try {
      const response = await fetch('http://192.168.80.249:3000/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcription }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Upload successful:', data);

      // Redirect or perform any other actions needed
    } catch (error) {
      console.error('Error uploading transcription:', error);
    }
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
    backgroundColor: '#1E90FF', // Blue background color
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
