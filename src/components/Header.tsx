import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii } from '../design/tokens';

export default function Header({ title }: { title: string }) {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={[colors.brand.purple, colors.brand.purple700]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        paddingTop: insets.top + 12,
        paddingBottom: 16,
        borderBottomLeftRadius: radii.xl,
        borderBottomRightRadius: radii.xl,
        alignItems: 'center',
      }}
    >
      <Text className="text-white text-2xl font-extrabold">{title}</Text>
    </LinearGradient>
  );
}
