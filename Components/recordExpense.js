import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import styles from '../styles/recordExpense';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranscription } from '../contexts/TranscriptionContext';
import { useRouter } from 'expo-router';

const RecordExpense = ({ onUpdate }) => {
  const [recording, setRecording] = useState(null);
  const { updateTranscription } = useTranscription();
  const [isProcessing, setIsProcessing] = useState(false); // Add flag to prevent multiple calls
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

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
    if (isProcessing) return; // Prevent multiple calls
    setIsProcessing(true);

    try {
      // Simulating the transcription process with hardcoded data
      const hardcodedTranscription = 'Wah today I had some amazing Wanton Noodles for Lunch and it only costed $5!';
      console.log(hardcodedTranscription);
      updateTranscription(hardcodedTranscription);

      if (onUpdate) {
        onUpdate(hardcodedTranscription);
      }

    } catch (error) {
      console.error('Error while processing audio:', error);
    } finally {
      setIsProcessing(false); // Reset the flag after processing
    }
  };

  const handleSimulateTranscription = () => {
    const hardcodedTranscription = 'I ate Nasi Padang for dinner and it cost me $5';
    console.log(hardcodedTranscription);
    updateTranscription(hardcodedTranscription);

    if (onUpdate) {
      onUpdate(hardcodedTranscription);
    }

    setIsOverlayVisible(true);
    setTimeout(() => setIsOverlayVisible(false), 3000); // Hide the overlay after 3 seconds
  };

  return (
    <View style={styles.holdButtonContainer}>
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}

      {/* Button to trigger hardcoded transcription */}
      <TouchableOpacity
        style={styles.holdButton}
        onPress={handleSimulateTranscription}
      >
        <LinearGradient
          colors={['#3558FF', 'transparent']}
          style={styles.holdButtonGradient}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.holdText}>
            Hold to SaySum...
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Full-screen overlay */}
      <Modal
        visible={isOverlayVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={overlayStyles.overlay}>
          <LinearGradient
            colors={['#3558FF', '#3558FF']}
            style={overlayStyles.gradientBackground}
          >
            <Text style={overlayStyles.overlayText}>What did you spend today?</Text>
            <View style={overlayStyles.spacer} />
            <Text style={overlayStyles.loadingText}>...</Text>
          </LinearGradient>
        </View>
      </Modal>
    </View>
  );
};

const overlayStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  spacer: {
    height: 200, // Adjust as needed for spacing
  },
  loadingText: {
    color: 'white',
    fontSize: 48,
    textAlign: 'center',
  },
});

export default RecordExpense;
