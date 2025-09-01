// src/components/InputBar.tsx
import React from 'react';
import { View, TextInput, Pressable, Text } from 'react-native';
import { colors, radii, space, type } from '../theme/tokens';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function InputBar({
  value,
  onChangeText,
  onSend,
}: {
  value: string;
  onChangeText: (t: string) => void;
  onSend: () => void;
}) {
  const insets = useSafeAreaInsets();
  const tabH = useBottomTabBarHeight();
  return (
    <View style={{ paddingHorizontal: space[16], paddingBottom: insets.bottom + tabH + 4 }}>
      <View
        style={{
          backgroundColor: colors.ui.white,
          borderRadius: radii.lg,
          paddingLeft: space[16],
          paddingRight: space[12],
          paddingVertical: space[10],
          flexDirection: 'row',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <TextInput
          placeholder="Type a message..."
          placeholderTextColor="rgba(0,0,0,0.35)"
          value={value}
          onChangeText={onChangeText}
          style={[{ flex: 1, color: colors.text.primary }, type.body]}
        />
        <Pressable
          onPress={onSend}
          style={{
            backgroundColor: colors.brand.purple,
            width: 40,
            height: 40,
            borderRadius: radii.pill,
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: space[8],
          }}
        >
          <Text style={{ color: colors.text.onPurple, fontSize: 18 }}>➤</Text>
        </Pressable>
      </View>
    </View>
  );
}
