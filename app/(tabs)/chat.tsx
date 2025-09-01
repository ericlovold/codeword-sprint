// app/(tabs)/chat.tsx (essentials only)
import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import GradientScreen from '../../src/components/GradientScreen';
import BrandHeader from '../../src/components/BrandHeader';
import InputBar from '../../src/components/InputBar';
import { colors, radii, space, type } from '../../src/theme/tokens';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Bubble({ role, children }: { role: 'coach' | 'user'; children: React.ReactNode }) {
  const bg = role === 'coach' ? colors.ui.white : colors.brand.purpleDeep;
  const fg = role === 'coach' ? colors.text.primary : colors.text.onPurple;
  const align = role === 'coach' ? 'flex-start' : 'flex-end';
  return (
    <View style={{ alignItems: align, marginBottom: space[12] }}>
      <View
        style={{
          backgroundColor: bg,
          borderRadius: radii.lg,
          paddingHorizontal: space[16],
          paddingVertical: space[12],
          maxWidth: '86%',
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <Text style={[type.chat, { color: fg }]}>{children}</Text>
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const [text, setText] = useState('');
  const insets = useSafeAreaInsets();
  const tabH = useBottomTabBarHeight();
  return (
    <GradientScreen>
      <BrandHeader />
      <ScrollView
        contentContainerStyle={{ padding: space[16], paddingBottom: tabH + insets.bottom + 120 }}
        showsVerticalScrollIndicator={false}
      >
        <Bubble role="coach">Hi Eric, I'm your Codeword AI coach…</Bubble>
        <Bubble role="user">I'm feeling overwhelmed and need someone to talk to.</Bubble>
        <Bubble role="coach">I'm really sorry you're feeling overwhelmed…</Bubble>
      </ScrollView>

      <InputBar value={text} onChangeText={setText} onSend={() => setText('')} />
    </GradientScreen>
  );
}
