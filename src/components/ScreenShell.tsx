import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BrandHeader from './BrandHeader';
import { tokens } from '../theme/tokens';

export default function ScreenShell({
  withHeader = true,
  children,
}: {
  withHeader?: boolean;
  children: React.ReactNode;
}) {
  return (
    <View style={StyleSheet.absoluteFill}>
      {withHeader && <BrandHeader />}
      <LinearGradient
        colors={[tokens.colors.gradTop, tokens.colors.gradMid, tokens.colors.gradBot]}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}
      >
        {children}
      </LinearGradient>
    </View>
  );
}
