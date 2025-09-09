import React, { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import BrandHeader from '../src/ui/BrandHeader';
import { initializeNotifications } from '../src/services/notificationService';

export default function RootLayout() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize notifications (will gracefully skip in dev mode)
        if (Platform.OS !== 'web') {
          await initializeNotifications();
        }

        // Add any other initialization tasks here
        // e.g., load user data, check auth status, etc.
      } catch (error) {
        console.log('App initialization warning:', error);
        // Continue without certain features in development
      } finally {
        // Always mark as initialized to proceed
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, []);

  return (
    <Stack
      screenOptions={{
        header: () => <BrandHeader />,
        headerTransparent: true,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="loading" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* Secondary screens opened from anywhere - now use BrandHeader */}
      <Stack.Screen name="help" options={{ title: 'Get Help' }} />
      <Stack.Screen name="onboarding-welcome" options={{ title: 'Welcome' }} />
      <Stack.Screen name="library/[slug]" options={{ title: 'Guide' }} />
    </Stack>
  );
}
