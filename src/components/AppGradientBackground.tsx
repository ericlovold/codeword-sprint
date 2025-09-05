import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AppGradientBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Main gradient exactly matching Figma */}
      <LinearGradient
        colors={['#7B3FF2', '#B4A1E2', '#A8E6CF', '#4BE3C1']}
        locations={[0, 0.3, 0.7, 1]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}
