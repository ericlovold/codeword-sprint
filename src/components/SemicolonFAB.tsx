import React, { useRef } from 'react';
import { View, Image, Animated, Pressable, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SIZE = 68; // FAB diameter
const TAB_HEIGHT = 64; // Must match tab bar height

export default function SemicolonFAB() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  // Only show when we're under the tabs group
  if (!pathname.startsWith('/(tabs)/')) return null;

  const bottom = insets.bottom + (TAB_HEIGHT - SIZE) / 2;

  const scale = useRef(new Animated.Value(1)).current;
  const onPressIn = () => Animated.spring(scale, { toValue: 0.96, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  return (
    <View
      pointerEvents="box-none"
      style={[StyleSheet.absoluteFill, { justifyContent: 'flex-end' }]}
    >
      <View pointerEvents="box-none" style={{ alignItems: 'center', marginBottom: bottom }}>
        <Animated.View
          style={{
            transform: [{ scale }],
            shadowColor: '#000',
            shadowOpacity: 0.18,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 8 },
            elevation: 8,
          }}
        >
          <Pressable
            onPress={() => router.push('/help')}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            accessibilityRole="button"
            accessibilityLabel="Get help"
            style={{
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
              backgroundColor: '#6D4AE7',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 4,
              borderColor: 'white',
            }}
          >
            <Image
              source={require('../../app/assets/icons/semicolon.png')}
              style={{ width: SIZE * 0.44, height: SIZE * 0.44 }}
              resizeMode="contain"
            />
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}
