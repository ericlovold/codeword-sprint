// src/components/BrandHeader.tsx
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { colors, radii, space } from '../theme/tokens';

export default function BrandHeader() {
  return (
    <View style={styles.wrap}>
      {/* Use the exact asset exported from Figma for the wordmark */}
      <Image
        source={require('../../app/assets/icons/CodewordLogo.png')}
        style={{ width: 156, height: 28, resizeMode: 'contain' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.brand.purple,
    paddingTop: space[16],
    paddingBottom: space[16],
    alignItems: 'center',
    borderBottomLeftRadius: radii.xl,
    borderBottomRightRadius: radii.xl,
  },
});
