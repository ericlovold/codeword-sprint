import React from 'react';
import { Stack } from 'expo-router';
import BrandHeader from '../src/components/BrandHeader';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => (
          <BrandHeader
            title={(props.options.title as string) || 'Codeword'}
            showBack={props.navigation.canGoBack()}
          />
        ),
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
