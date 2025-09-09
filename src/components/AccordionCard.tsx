import React, { useRef, useState } from 'react';
import { View, Text, Pressable, Animated, LayoutChangeEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadow } from '../design/tokens';

type Props = {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export default function AccordionCard({ title, defaultOpen, children }: Props) {
  const [open, setOpen] = useState(!!defaultOpen);
  const [measured, setMeasured] = useState(0);
  const anim = useRef(new Animated.Value(defaultOpen ? 1 : 0)).current;

  const toggle = () => {
    setOpen((v) => !v);
    Animated.timing(anim, { toValue: open ? 0 : 1, duration: 180, useNativeDriver: false }).start();
  };

  const onContentLayout = (e: LayoutChangeEvent) => {
    if (!measured) setMeasured(e.nativeEvent.layout.height);
  };

  const height = anim.interpolate({ inputRange: [0, 1], outputRange: [0, measured || 1] });
  const rotate = anim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '90deg'] });

  return (
    <View
      style={[
        {
          backgroundColor: 'rgba(255,255,255,0.92)',
          borderRadius: radii.xl,
          borderWidth: 1,
          borderColor: colors.surface.ring,
          marginBottom: 12,
        },
        shadow.card,
      ]}
    >
      <Pressable
        onPress={toggle}
        style={{
          paddingHorizontal: 16,
          paddingVertical: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: '700', color: colors.text.title }}>{title}</Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Ionicons name="chevron-forward" size={22} color={colors.text.faint} />
        </Animated.View>
      </Pressable>

      {/* animated body */}
      <Animated.View style={{ height, overflow: 'hidden' }}>
        <View onLayout={onContentLayout} style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
}
