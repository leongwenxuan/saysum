import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

const CircleButton = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [recording, setRecording] = useState(null);

  useEffect(() => {
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, [recording]);

  const handlePressIn = async () => {
    setIsPressed(true);
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access microphone is required!');
        return;
      }

      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recordingInstance.startAsync();
      setRecording(recordingInstance);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const handlePressOut = async () => {
    setIsPressed(false);
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);

      await transcribeRecording(uri);
    } catch (err) {
      console.error('Failed to stop recording', err);
    } finally {
      setRecording(null);
    }
  };

  const transcribeRecording = async (uri) => {
    try {
      const endpoint = "https://api.jigsawstack.com/v1/ai/transcribe";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "<your-api-key>",
        },
        body: JSON.stringify({ url: uri }),
      };
      const response = await fetch(endpoint, options);
      const result = await response.json();
      console.log('Transcription result:', result);

      setSpeechText(result.transcription || "No transcription available");
    } catch (error) {
      Alert.alert("Error", "Failed to transcribe speech");
      console.error('Error transcribing recording:', error);
    }
  };

  return (
    <View style={[styles.container, isPressed && styles.pressedContainer]}>
      {isPressed && <Text style={styles.topText}>What did you spend today?</Text>}
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.circleButtonWrapper, isPressed && styles.pressedButton]}
      >
        <LinearGradient
          colors={isPressed ? ['white', 'blue'] : ['blue', 'white']}
          style={styles.circleButton}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 1 }}
        />
      </Pressable>
      {isPressed ? (
        <Text style={styles.bottomText}>...</Text>
      ) : (
        <Text style={styles.bottomText}>Hold to saysum...</Text>
      )}
      {speechText && <Text style={styles.speechText}>{speechText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pressedContainer: {
    backgroundColor: 'blue',
  },
  topText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  circleButtonWrapper: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressedButton: {
    backgroundColor: 'transparent',
  },
  circleButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  bottomText: {
    fontSize: 18,
    color: 'black',
    marginTop: 20,
  },
  speechText: {
    marginTop: 20,
    fontSize: 16,
    color: 'white',
  },
});

export default CircleButton;
