import React from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, space, type } from '../theme/tokens';

const HomePNG = require('../../app/assets/icons/ChatAi ICON.png');
const LibraryPNG = require('../../app/assets/icons/AiIcon.png');
const SemicolonPNG = require('../../app/assets/icons/SemicolonIconPurple.png');
const CoachPNG = require('../../app/assets/icons/FistBumpIcon002.png');
const ProfilePNG = require('../../app/assets/icons/AlliesIcon.png');

const TAB_CONFIG = {
  chat: { icon: HomePNG, label: 'Home' },
  library: { icon: LibraryPNG, label: 'Library' },
  mood: { icon: CoachPNG, label: 'Coach' },
  profile: { icon: ProfilePNG, label: 'Profile' },
};

export default function BrandTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const activeColor = colors.brand.purple;
  const inactiveColor = '#C7BCD9';

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          borderTopColor: colors.ui.divider,
        },
      ]}
    >
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const config = TAB_CONFIG[route.name as keyof typeof TAB_CONFIG];

          if (!config) return null;

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={styles.tab}
            >
              <Image
                source={config.icon}
                style={[styles.icon, { tintColor: isFocused ? activeColor : inactiveColor }]}
              />
              <Text style={[styles.label, { color: isFocused ? activeColor : inactiveColor }]}>
                {config.label}
              </Text>
            </Pressable>
          );
        })}

        {/* Center Semicolon Tab - Always Purple, Bigger, No Label */}
        <Pressable
          onPress={() => {
            // Navigate to help screen using the parent navigator
            navigation.getParent()?.navigate('help' as any);
          }}
          style={styles.centerTab}
        >
          <View style={styles.centerButton}>
            <Image source={SemicolonPNG} style={styles.centerIcon} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ui.white,
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: space[16],
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: space[8],
  },
  icon: {
    width: 26,
    height: 26,
    marginBottom: space[4],
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
  centerTab: {
    position: 'absolute',
    left: '50%',
    marginLeft: -28,
    top: -8,
  },
  centerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.ui.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.brand.purple,
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 8,
  },
  centerIcon: {
    width: 36,
    height: 36,
  },
});
