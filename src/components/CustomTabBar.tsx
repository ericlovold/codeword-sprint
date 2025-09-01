import React from 'react';
import { View, Pressable, Image, Text, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BRAND = {
  purple: '#6F2DBD',
  purpleDark: '#5B22A0',
  cream: '#F7F3FB',
  label: '#6B6B7A',
  labelActive: '#3E3E54',
};

const TAB_ICON = (routeName: string) => {
  switch (routeName) {
    case 'chat':
      return require('../../assets/icons/tabs/TabChat.png');
    case 'library':
      return require('../../assets/icons/tabs/TabLibrary.png');
    case 'mood':
      return require('../../assets/icons/tabs/TabCoach.png');
    case 'profile':
      return require('../../assets/icons/tabs/TabProfile.png');
    default:
      return require('../../assets/icons/tabs/TabChat.png');
  }
};

const FAB_ICON = require('../../assets/icons/semicolon.png'); // solid purple mark

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const TAB_H = 70;
  const FAB = 74;

  return (
    <View
      style={[
        styles.shell,
        {
          paddingBottom: insets.bottom ? insets.bottom - 4 : 10,
          height: TAB_H + (insets.bottom || 10),
        },
      ]}
      pointerEvents="box-none"
    >
      {/* Row of tab items */}
      <View style={styles.row} pointerEvents="auto">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
          };

          return (
            <Pressable key={route.key} onPress={onPress} style={styles.tabBtn} hitSlop={10}>
              <Image
                source={TAB_ICON(route.name)}
                style={[styles.icon, { opacity: isFocused ? 1 : 0.55 }]}
                resizeMode="contain"
              />
              <Text
                style={[styles.label, { color: isFocused ? BRAND.labelActive : BRAND.label }]}
                numberOfLines={1}
              >
                {descriptors[route.key]?.options.tabBarLabel ??
                  route.name[0].toUpperCase() + route.name.slice(1)}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Center FAB */}
      <Pressable
        onPress={() => navigation.navigate('chat')} // or "launchpad"
        style={[
          styles.fab,
          {
            width: FAB,
            height: FAB,
            borderRadius: FAB / 2,
            bottom: TAB_H - FAB / 2, // half over the bar
            left: '50%',
            transform: [{ translateX: -FAB / 2 }],
            backgroundColor: BRAND.purple,
          },
        ]}
      >
        <Image source={FAB_ICON} style={{ width: 36, height: 36, tintColor: 'white' }} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    overflow: 'visible',
  },
  row: {
    marginHorizontal: 18,
    borderRadius: 24,
    backgroundColor: 'white',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 12,
  },
  tabBtn: {
    width: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { width: 26, height: 26, marginBottom: 4 },
  label: { fontSize: 12, fontWeight: '600' },
  fab: {
    position: 'absolute',
    zIndex: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 20,
  },
});
