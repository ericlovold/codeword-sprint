import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = '#642975',
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = () => {
      spinValue.setValue(0);
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => spin());
    };
    spin();
  }, [spinValue]);

  const spinAnimation = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const dimensions = {
    small: 16,
    medium: 24,
    large: 32,
  };

  const borderWidth = {
    small: 2,
    medium: 3,
    large: 4,
  };

  return (
    <Animated.View
      style={[
        styles.spinner,
        {
          width: dimensions[size],
          height: dimensions[size],
          borderWidth: borderWidth[size],
          borderColor: `${color}20`,
          borderTopColor: color,
          transform: [{ rotate: spinAnimation }],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  spinner: {
    borderRadius: 50,
  },
});

export default LoadingSpinner;
