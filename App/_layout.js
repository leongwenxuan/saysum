import { Stack } from 'expo-router/stack';

export default function Layout() {
    <Stack>
        <Stack.Screen 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="monthspent" options={{ headerShown: false }} />
    </Stack>
  return <Stack />;
}