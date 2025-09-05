import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { COLORS, TYPE } from '../design/tokens';
import Icon from '../components/Icon';

export default function CWTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const icons: Record<string, 'home' | 'guides' | 'coach' | 'profile' | null> = {
    codeword: 'home',
    library: 'guides',
    launchpad: null, // Center FAB
    coach: 'coach',
    profile: 'profile',
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.title !== undefined ? options.title : route.name;
          const isFocused = state.index === index;
          const iconName = icons[route.name as keyof typeof icons];

          if (route.name === 'launchpad') {
            return (
              <View key={index} style={styles.fabContainer}>
                <TouchableOpacity style={styles.fab} onPress={() => router.push('/get-support')}>
                  <Image
                    source={require('../../assets/icons/brand/SemicolonIconPurple.png')}
                    style={{ width: 24, height: 24, tintColor: COLORS.white }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            );
          }

          return (
            <TouchableOpacity
              key={index}
              style={styles.tab}
              onPress={() => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
            >
              {iconName && (
                <Icon name={iconName} size={24} color={isFocused ? '#642975' : '#666666'} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: '#E0E0E0',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  fabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#642975',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  label: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
});
