import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import { useTranscription } from '../contexts/TranscriptionContext';
import { CHATGPT_API_KEY, CHATGPT_API_ENDPOINT } from '@env';

const CategoryGpt = () => {
  const [category, setCategory] = useState('');
  const { transcription, transcriptionUpdated, setTranscriptionUpdated } = useTranscription();

  useEffect(() => {
    if (transcriptionUpdated) {
      handleGptRequest();
      setTranscriptionUpdated(false);
    }
  }, [transcriptionUpdated]);

  const handleGptRequest = () => {
    if (!transcription) {
      console.error('No transcription available');
      return;
    }

    axios.post(CHATGPT_API_ENDPOINT, {
      model: 'davinci-002',
      prompt: transcription,
      max_tokens: 50
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHATGPT_API_KEY}`
      }
    }).then(response => {
      const output = response.data.choices[0].text.trim();
      // Filter the output to only include the specified categories
      const categories = output.split('\n').filter(category => {
        return ['Food', 'Clothes', 'Gadgets', 'Travel', 'Personal Care', 'Miscellaneous'].includes(category);
      });
      // Set the first category as the result
      setCategory(categories.length > 0 ? categories[0] : 'Miscellaneous');
    }).catch(error => {
      console.error('Error:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    });
  };

  return (
    <View>
      {/* <Text>Transcription from previous component:</Text> */}
      <Text>{transcription}</Text>
      {category !== '' && (
        <Text>Categorized Category: {category}</Text>
      )}
    </View>
  );
};

export default CategoryGpt;
