import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii } from '../design/tokens';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type Props = {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  subtitle?: string;
};

export default function Header({ title, showBack, onBack, subtitle }: Props) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  return (
    <LinearGradient
      colors={[colors.brand.purple, colors.brand.purple700]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        paddingTop: insets.top + 10,
        paddingBottom: 16,
        borderBottomLeftRadius: radii.xl,
        borderBottomRightRadius: radii.xl,
        paddingHorizontal: 16,
      }}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        {showBack && (
          <Pressable
            onPress={onBack ?? router.back}
            hitSlop={12}
            style={{ position: 'absolute', left: 0, top: 2, padding: 4 }}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </Pressable>
        )}
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '900' }}>{title}</Text>
        {!!subtitle && (
          <Text style={{ color: 'rgba(255,255,255,0.86)', marginTop: 2 }}>{subtitle}</Text>
        )}
      </View>
    </LinearGradient>
  );
}
