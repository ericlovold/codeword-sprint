import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { tokens } from '../theme/tokens';

export default function BrandHeader({ title = 'Codeword' }: { title?: string }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 10 }]}>
      <View style={styles.bar}>
        <Text style={styles.title}>{title}</Text>
        <Image
          source={require('../../assets/icons/brand/SemicolonIconPurple.png')}
          style={{
            width: 16,
            height: 16,
            resizeMode: 'contain',
            marginLeft: 6,
            tintColor: '#A7F3E9',
          }}
        />
      </View>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: tokens.colors.brand,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  bar: {
    alignItems: 'center',
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: { color: tokens.colors.brandOn, fontSize: 22, fontWeight: '700', letterSpacing: 0.3 },
  divider: { height: 8, opacity: 0 }, // keeps spacing like figma cap
});
