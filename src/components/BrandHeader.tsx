import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii } from '../theme/tokens';

export default function BrandHeader() {
  const insets = useSafeAreaInsets();
  const H = 88 + insets.top;

  return (
    <View style={[styles.wrap, { paddingTop: insets.top, height: H }]}>
      <Text style={styles.title}>
        Codeword <Text style={styles.mark}>;</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.purple,
    borderBottomLeftRadius: radii.xl,
    borderBottomRightRadius: radii.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 0.25,
  },
  mark: { color: colors.mint },
});
