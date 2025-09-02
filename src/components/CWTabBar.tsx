import React from 'react';
import { View, Pressable, Image, Text, StyleSheet, LayoutChangeEvent } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii, shadows, spacing } from '../theme/tokens';

const CENTER = 76; // central button diameter

export default function CWTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [barW, setBarW] = React.useState(0);

  const onLayout = (e: LayoutChangeEvent) => setBarW(e.nativeEvent.layout.width);
  const centerLeft = (barW - CENTER) / 2;

  return (
    <View style={{ paddingBottom: insets.bottom, backgroundColor: 'transparent' }}>
      <View onLayout={onLayout} style={styles.bar}>
        {state.routes.map((route, idx) => {
          const { options } = descriptors[route.key];
          const focused = state.index === idx;
          // leave middle slot empty – we'll draw the center button over it
          if (options.tabBarLabel === 'Launchpad')
            return <View key={route.key} style={{ width: CENTER }} />;

          const label = (options.tabBarLabel ?? options.title ?? route.name) as string;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
          };

          const icon = options.tabBarIcon
            ? options.tabBarIcon({
                focused,
                color: focused ? colors.tabIconActive : colors.tabIcon,
                size: 24,
              })
            : null;

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={styles.item}
              accessibilityRole="button"
            >
              {icon}
              <Text
                style={[styles.label, focused && { color: colors.tabIconActive }]}
                numberOfLines={1}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Center FAB */}
      <Pressable
        onPress={() => navigation.navigate('chat' as never)}
        style={[styles.center, { left: centerLeft }]}
        accessibilityLabel="Launchpad"
      >
        <Image
          source={require('../../app/assets/icons/semicolon.png')}
          style={{ width: 36, height: 36, tintColor: 'white' }}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    marginHorizontal: spacing.lg,
    marginTop: CENTER / 2, // give room for the floating button
    backgroundColor: colors.tabBG,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    height: 74,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    ...shadows.tab,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    width: 80,
  },
  label: {
    fontSize: 12,
    color: colors.tabIcon,
  },
  center: {
    position: 'absolute',
    bottom: 74 - CENTER / 2, // half overlaps the bar
    width: CENTER,
    height: CENTER,
    borderRadius: CENTER / 2,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.fab,
    zIndex: 50,
  },
});
