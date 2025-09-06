import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import LottieView from 'lottie-react-native';

interface LoadingIndicatorProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  fullScreen?: boolean;
}

export default function LoadingIndicator({
  message,
  size = 'medium',
  fullScreen = false,
}: LoadingIndicatorProps) {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    animationRef.current?.play();
  }, []);

  const getSize = () => {
    switch (size) {
      case 'small':
        return 60;
      case 'large':
        return 150;
      default:
        return 100;
    }
  };

  const animationSize = getSize();

  const content = (
    <>
      <LottieView
        ref={animationRef}
        source={require('../../assets/animations/loading-dots.json')}
        style={{
          width: animationSize,
          height: animationSize,
        }}
        autoPlay
        loop
      />
      {message && <Text style={styles.message}>{message}</Text>}
    </>
  );

  if (fullScreen) {
    return (
      <View style={styles.fullScreenContainer}>
        <View style={styles.backdrop} />
        <View style={styles.contentContainer}>{content}</View>
      </View>
    );
  }

  return <View style={styles.container}>{content}</View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  fullScreenContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: '#642975',
    fontWeight: '500',
    textAlign: 'center',
  },
});
