import { View, Text } from 'react-native';
import { colors } from '../design/tokens';

export default function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}>
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          marginTop: 9,
          backgroundColor: colors.brand.purple,
        }}
      />
      <Text style={{ fontSize: 16, color: colors.text.body, flex: 1 }}>{children as any}</Text>
    </View>
  );
}
