import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BrandHeader() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#642975" />
      <View style={[styles.container, { paddingTop: insets.top }]} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#642975',
  },
});
