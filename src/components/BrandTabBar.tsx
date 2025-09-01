import React from 'react';
import { View, Pressable, Image, Text, Platform, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii } from '../theme/tokens';

// --- Precise dimensions from Figma ---
const TAB_H = 84; // bar height from Figma (~82–88)
const SIDE_ICON = 26; // side icon size
const CENTER_SIZE = 72; // floating circle diameter
const LIFT = -20; // how much the center floats up
const SEMI_W = 30; // semicolon glyph width
const SEMI_H = 46; // semicolon glyph height

const SEMICOLON = require('../../app/assets/icons/White Semicolon.png');

export default function BrandTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const mid = Math.floor(state.routes.length / 2);

  return (
    <View style={[styles.wrap, { paddingBottom: insets.bottom ? insets.bottom : 8 }]}>
      <View style={styles.rail} />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        const onLongPress = () => {
          navigation.emit({ type: 'tabLongPress', target: route.key });
        };

        // Center: big semicolon, always purple, no label
        if (index === mid) {
          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.centerBtn}
            >
              <Image
                source={SEMICOLON}
                style={[styles.semicolon, { tintColor: colors.brand.purple }]}
                resizeMode="contain"
              />
            </Pressable>
          );
        }

        // Non-center: use provided tabBarIcon or fall back to text label
        const maybeIcon = options.tabBarIcon as
          | ((props: { focused: boolean; color: string; size: number }) => React.ReactNode)
          | undefined;

        const labelColor = isFocused ? colors.brand.purple : '#C7BCD9';

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.item}
          >
            <View style={[styles.iconBox, { opacity: isFocused ? 1 : 0.6 }]}>
              {maybeIcon
                ? maybeIcon({ focused: isFocused, color: labelColor, size: SIDE_ICON })
                : null}
            </View>
            <Text numberOfLines={1} style={[styles.label, { color: labelColor }]}>
              {options.title ?? route.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: TAB_H,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 8,
    backgroundColor: colors.ui.white,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: -4 },
      },
      android: { elevation: 12 },
    }),
  },
  rail: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.ui.divider,
  },
  item: {
    height: TAB_H,
    minWidth: 64,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    height: SIDE_ICON,
    width: SIDE_ICON,
    marginBottom: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '600',
  },
  centerBtn: {
    width: CENTER_SIZE,
    height: CENTER_SIZE,
    borderRadius: CENTER_SIZE / 2,
    backgroundColor: colors.ui.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: LIFT, // pulls into the curve
    // subtle lift
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 16 },
    }),
  },
  semicolon: {
    width: SEMI_W,
    height: SEMI_H,
    resizeMode: 'contain',
  },
});
