import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';

interface AppLoadingScreenProps {
  onFinish?: () => void;
}

export default function AppLoadingScreen({ onFinish }: AppLoadingScreenProps) {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    animationRef.current?.play();

    // Show loading screen long enough for font cycle animation to complete
    const timer = setTimeout(() => {
      onFinish?.();
    }, 25000); // 25 seconds to let the font cycling animation complete

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <LottieView
          ref={animationRef}
          source={require('../../assets/animations/wordmark_loading_transparent.json')}
          style={styles.wordmarkAnimation}
          autoPlay
          loop
          speed={0.8} // Slower to showcase the full font cycling animation
        />

        <Text style={styles.tagline}>Your crisis support companion</Text>
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
    width: 380, // Much bigger
    height: 200, // Proportionally bigger
    marginBottom: 20,
  },
  tagline: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
    fontWeight: '500',
    marginTop: 20,
  },
});
