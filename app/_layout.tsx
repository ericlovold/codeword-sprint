import React from 'react';
import { Stack } from 'expo-router';
import BrandHeader from '../src/ui/BrandHeader';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        header: () => <BrandHeader />,
        headerTransparent: true,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Secondary screens opened from anywhere - now use BrandHeader */}
      <Stack.Screen name="help" options={{ title: 'Get Help' }} />
      <Stack.Screen name="terms" options={{ title: 'Terms & Conditions' }} />
      <Stack.Screen name="onboarding" options={{ title: 'Welcome' }} />
      <Stack.Screen name="library/[slug]" options={{ title: 'Guide' }} />
    </Stack>
  );
}
