import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function TabBtn({
  active,
  label,
  onPress,
  icon,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
  icon: React.ReactNode;
}) {
  return (
    <Pressable onPress={onPress} style={styles.tab}>
      <View style={{ opacity: active ? 1 : 0.45 }}>{icon}</View>
      <Text style={[styles.label, active && styles.labelActive]} numberOfLines={1}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const go = (name: string) => () => navigation.navigate(name as never);
  const isActive = (name: string) => state.routes[state.index]?.name === name;

  return (
    <View style={[styles.wrap, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      <View style={styles.bar}>
        <TabBtn
          active={isActive('chat')}
          label="Chat"
          onPress={go('chat')}
          icon={<MaterialCommunityIcons name="chat-outline" size={24} />}
        />
        <TabBtn
          active={isActive('library')}
          label="Library"
          onPress={go('library')}
          icon={<Ionicons name="book-outline" size={24} />}
        />

        {/* Center FAB */}
        <Pressable onPress={go('get-help')} style={styles.fab} hitSlop={12}>
          <Text style={styles.fabGlyph}>;</Text>
        </Pressable>

        <TabBtn
          active={isActive('mood')}
          label="Mood"
          onPress={go('mood')}
          icon={<MaterialCommunityIcons name="heart-pulse" size={24} />}
        />
        <TabBtn
          active={isActive('profile')}
          label="Profile"
          onPress={go('profile')}
          icon={<Ionicons name="person-outline" size={24} />}
        />
      </View>
    </View>
  );
}

const PURPLE = '#6F45CF';

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.08)',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  tab: {
    width: 72,
    alignItems: 'center',
    gap: 2,
  },
  label: { fontSize: 11, color: '#555' },
  labelActive: { color: PURPLE, fontWeight: '600' },
  fab: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -28 }, { translateY: -18 }],
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: PURPLE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  fabGlyph: { color: 'white', fontSize: 32, lineHeight: 36, fontWeight: '800' },
});
