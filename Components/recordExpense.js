import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import styles from '../styles/recordExpense';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranscription } from '../contexts/TranscriptionContext';

const RecordExpense = () => {
  const [recording, setRecording] = useState(null);
  const { updateTranscription } = useTranscription();

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access audio was denied');
      }
    };
    getPermissions();
  }, []);

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        interruptionModeIOS: 1,
        shouldDuckAndroid: true,
        interruptionModeAndroid: 1,
        playThroughEarpieceAndroid: false,
      });

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
      console.log('Recording started');
    } catch (error) {
      console.error('Error while starting recording:', error);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('Recording stopped, file saved at:', uri);
      setRecording(null);
      await processAudio(uri);
    } catch (error) {
      console.error('Error while stopping recording:', error);
    }
  };

  const processAudio = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const key = 'audio.wav';
      const endpoint = `https://api.jigsawstack.com/v1/store/file?key=${key}&overwrite=true`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'audio/wav',
          'x-api-key': 'sk_83817fa5580adfd33c92236bd5d059109b2c87c457f55636fb1663605fb8912387feb40ee087f7d0a72416ecfc3d8ce1a1d90668675ef9ea6d9fc559bd719092024nssPTqbzBvwPToaHEN',
        },
        body: blob,
      };

      const uploadResponse = await fetch(endpoint, options);
      const data = await uploadResponse.json();
      console.log('File storage key:', data.url);

      const transcriptionResponse = await fetch('https://api.jigsawstack.com/v1/ai/transcribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'sk_83817fa5580adfd33c92236bd5d059109b2c87c457f55636fb1663605fb8912387feb40ee087f7d0a72416ecfc3d8ce1a1d90668675ef9ea6d9fc559bd719092024nssPTqbzBvwPToaHEN',
        },
        body: JSON.stringify({
          file_store_key: 'audio.wav',
          language: 'en',
          translate: true,
        }),
      });

      const transcriptionData = await transcriptionResponse.json();
      console.log(transcriptionData.text);
      updateTranscription(transcriptionData.text || 'No transcription available');
    } catch (error) {
      console.error('Error while processing audio:', error);
    }
  };

  return (
    <View style={styles.holdButtonContainer}>
      <TouchableOpacity
        style={styles.holdButton}
        onPressIn={startRecording}
        onPressOut={stopRecording}>
        <LinearGradient
        colors={['#3558FF', 'transparent']}
        style={styles.holdButtonGradient}
        start={{ x: 0.5, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        >
        <Text style={styles.holdText}>
          {recording ? 'Hold to SaySum...' : 'Listening to Sum'}
        </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default RecordExpense;
