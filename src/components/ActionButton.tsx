import { Pressable, Text, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radii, shadow } from '../design/tokens';

type Props = {
  label: string;
  onPress: () => void;
  variant?: 'solid' | 'outline';
  style?: ViewStyle;
};

export default function ActionButton({ label, onPress, variant = 'solid', style }: Props) {
  if (variant === 'outline') {
    return (
      <Pressable
        onPress={onPress}
        style={[
          {
            borderRadius: radii.xl,
            borderWidth: 2,
            borderColor: colors.brand.purple,
            paddingVertical: 16,
            alignItems: 'center',
            backgroundColor: 'white',
          },
          style,
          shadow.card,
        ]}
      >
        <Text style={{ color: colors.brand.purple, fontSize: 18, fontWeight: '700' }}>{label}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={[{ borderRadius: radii.xl }, style, shadow.card]}>
      <LinearGradient
        colors={[colors.brand.purple, colors.brand.purple700]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingVertical: 18,
          borderRadius: radii.xl,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: '800' }}>{label}</Text>
      </LinearGradient>
    </Pressable>
  );
}
