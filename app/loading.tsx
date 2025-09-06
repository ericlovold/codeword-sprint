import React, { useRef } from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';

export default function LoadingScreen() {
  const animationRef = useRef<LottieView>(null);
  const router = useRouter();

  const handleContinue = () => {
    router.push('/welcome');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <LottieView
          ref={animationRef}
          source={require('../assets/animations/wordmark_loading_transparent.json')}
          style={styles.wordmarkAnimation}
          autoPlay
          loop
          speed={0.8} // Slower to showcase the full font cycling animation
        />

        <Text style={styles.tagline}>Your crisis support companion</Text>

        {/* Debug button - can be removed later */}
        <Pressable style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#642975', // Solid dark purple background
  },
  content: {
    alignItems: 'center',
    padding: 20,
  },
  wordmarkAnimation: {
    width: '90%', // Use percentage for better scaling
    height: 300, // Bigger height
    maxWidth: 500, // Max width for larger screens
    marginBottom: 40,
  },
  tagline: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 40,
  },
  continueButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  continueText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
