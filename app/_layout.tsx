import React, { useState, useEffect } from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import BrandHeader from '../src/ui/BrandHeader';
import { initializeNotifications } from '../src/services/notificationService';
import VideoSplash from '../src/components/VideoSplash';
import { storage } from '../src/utils/storage';
import { AuthProvider } from '../src/contexts/AuthContext';
import LoadingSpinner from '../src/components/LoadingSpinner';

export default function RootLayout() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [isFirstTimeUser, setIsFirstTimeUser] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check if user has completed onboarding
        const hasCompleted = await storage.hasCompletedOnboarding();
        setIsFirstTimeUser(!hasCompleted);

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

  // Show video splash first
  if (showSplash) {
    return <VideoSplash onComplete={() => setShowSplash(false)} />;
  }

  // Wait for initialization to complete
  if (!isInitialized || isFirstTimeUser === null) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner size="large" color="#642975" />
        <Text style={styles.loadingText}>Initializing...</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          header: () => <BrandHeader />,
          headerTransparent: true,
          animation: 'slide_from_right',
        }}
        initialRouteName={isFirstTimeUser ? 'welcome' : undefined}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="loading" options={{ headerShown: false }} />
        {/* Secondary screens opened from anywhere - now use BrandHeader */}
        <Stack.Screen name="help" options={{ title: 'Get Help' }} />
        <Stack.Screen name="onboarding-welcome" options={{ title: 'Welcome' }} />
        <Stack.Screen name="choose-codeword" options={{ headerShown: false }} />
        <Stack.Screen name="terms-conditions" options={{ headerShown: false }} />
        <Stack.Screen name="your-info" options={{ headerShown: false }} />
        <Stack.Screen name="enable-alerts" options={{ headerShown: false }} />
        <Stack.Screen name="connect-allies" options={{ headerShown: false }} />
        <Stack.Screen name="library/[slug]" options={{ title: 'Guide' }} />
      </Stack>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F3F7',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#642975',
    fontWeight: '500',
  },
});
