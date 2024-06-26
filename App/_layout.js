import React from 'react';
import { Stack } from 'expo-router';
import { AppProvider } from '../contexts/context';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="monthspent" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="confirmation" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="languageSelect"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="budgetSetup"
        options={{ headerShown: false }}
      />

    </Stack>
  );
}
