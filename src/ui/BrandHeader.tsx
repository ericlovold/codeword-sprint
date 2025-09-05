import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BrandHeader() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#642975" />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <Text style={styles.brandText}>
          Codeword<Text style={styles.semicolon}>;</Text>
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#642975',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
  },
  semicolon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '400',
    opacity: 0.7,
  },
});
