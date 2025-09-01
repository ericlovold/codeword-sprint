import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Tabs/screens set their own headers
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="(tabs)" />
      {/* Secondary screens opened from anywhere */}
      <Stack.Screen name="help" options={{ headerShown: true, title: 'Get Help' }} />
      <Stack.Screen name="terms" options={{ headerShown: true, title: 'Terms & Conditions' }} />
      <Stack.Screen name="onboarding" options={{ headerShown: true, title: 'Welcome' }} />
      <Stack.Screen name="library/[slug]" options={{ headerShown: true, title: 'Guide' }} />
    </Stack>
  );
}
