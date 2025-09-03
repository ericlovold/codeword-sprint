// src/ui/BrandHeader.tsx
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii, spacing } from '../theme/tokens';

export default function BrandHeader() {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.wrap, { paddingTop: insets.top + spacing.lg }]}>
      <Text style={styles.logo}>
        Codeword <Text style={styles.semi}>;</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.purple,
    borderBottomLeftRadius: radii.xl,
    borderBottomRightRadius: radii.xl,
    paddingBottom: spacing.md,
    alignItems: 'center',
  },
  logo: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  semi: { color: colors.mint },
});
