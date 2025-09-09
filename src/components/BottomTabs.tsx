import React from 'react';
import { View, Pressable, Image, Text, Platform } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const PURPLE = '#6E36CC';
const GRAY = '#8A8A8E';
const BAR_H = 64; // visual bar height (without safe-area)

export default function BottomTabs({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const go = (routeName: string) => {
    const route = state.routes.find((r) => r.name === routeName);
    if (!route) return;
    navigation.navigate(route.name as never);
  };

  return (
    <SafeAreaView edges={['bottom']} style={{ backgroundColor: 'transparent' }}>
      {/* Bar container: rounded, anchored to bottom safe-area */}
      <View
        style={{
          height: BAR_H,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginHorizontal: 16,
          marginBottom: Math.max(insets.bottom, 8),
          backgroundColor: '#FFF',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000',
          shadowOpacity: 0.12,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: -2 },
          elevation: 8,
        }}
      >
        {/* Left tabs */}
        <TabButton
          label="Codeword"
          active={state.index === state.routes.findIndex((r) => r.name === 'chat')}
          onPress={() => go('chat')}
          icon={require('../../app/assets/icons/tabs/TabChat.png')}
        />
        <TabButton
          label="Guides"
          active={state.index === state.routes.findIndex((r) => r.name === 'library')}
          onPress={() => go('library')}
          icon={require('../../app/assets/icons/tabs/TabLibrary.png')}
        />

        {/* Spacer for the center action */}
        <View style={{ width: 72 }} />

        {/* Right tabs */}
        <TabButton
          label="Coach"
          active={state.index === state.routes.findIndex((r) => r.name === 'mood')}
          onPress={() => go('mood')}
          icon={require('../../app/assets/icons/tabs/TabCoach.png')}
        />
        <TabButton
          label="Profile"
          active={state.index === state.routes.findIndex((r) => r.name === 'profile')}
          onPress={() => go('profile')}
          icon={require('../../app/assets/icons/tabs/TabProfile.png')}
        />
      </View>

      {/* Center semicolon: perfectly centered & anchored */}
      <Pressable
        accessibilityRole="button"
        onPress={() => go('chat')} // or launchpad route if you have one
        style={{
          position: 'absolute',
          left: '50%',
          bottom: (insets.bottom || 8) + BAR_H - 36, // overlaps bar by ~36px
          transform: [{ translateX: -36 }],
          width: 72,
          height: 72,
          borderRadius: 36,
          backgroundColor: PURPLE,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOpacity: 0.2,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 10,
        }}
      >
        <Image
          source={require('../../app/assets/icons/semicolon.png')}
          style={{ width: 36, height: 36, resizeMode: 'contain' }}
        />
      </Pressable>
    </SafeAreaView>
  );
}

function TabButton({
  icon,
  label,
  active,
  onPress,
}: {
  icon: any;
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{ alignItems: 'center', justifyContent: 'center', minWidth: 60, gap: 4 }}
    >
      <Image source={icon} style={{ width: 24, height: 24 }} />
      <Text style={{ fontSize: 12, color: active ? PURPLE : GRAY }}>{label}</Text>
    </Pressable>
  );
}
