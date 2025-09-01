import React from 'react';
import { View, Pressable, Image, Text, Platform, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii, space } from '../theme/tokens';

const SEMICOLON = require('../../app/assets/icons/SemicolonIconPurple.png');

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
              <Image source={SEMICOLON} style={styles.semicolon} resizeMode="contain" />
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
              {maybeIcon ? maybeIcon({ focused: isFocused, color: labelColor, size: 24 }) : null}
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
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
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
    height: 64,
    minWidth: 64,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBox: {
    height: 26,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '600',
  },
  centerBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.ui.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -22, // lifts the semicolon into the curve
  },
  semicolon: { width: 28, height: 40 }, // taller than others; always purple PNG
});
