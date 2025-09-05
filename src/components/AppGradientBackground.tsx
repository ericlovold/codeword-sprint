import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AppGradientBackground() {
  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Main gradient exactly matching Figma */}
      <LinearGradient
        colors={['#B794F4', '#B4E7CE']}
        locations={[0.3, 0.9]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}
