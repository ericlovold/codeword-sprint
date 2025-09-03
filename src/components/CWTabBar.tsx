// src/ui/CWTabBar.tsx
import { View, Pressable, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radii, spacing, dims } from '../theme/tokens';

type Props = {
  state: any;
  descriptors: any;
  navigation: any;
  getIcon: (routeName: string, focused: boolean) => any;
};

export default function CWTabBar({ state, descriptors, navigation, getIcon }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ height: dims.TAB_HEIGHT + insets.bottom + spacing.xl }}>
      {/* Bar surface */}
      <View style={[styles.bar, { bottom: insets.bottom + spacing.md }]}>
        {state.routes.map((route: any, index: number) => {
          // skip center slot (we draw FAB there)
          if (index === 2) return <View key={route.key} style={{ width: dims.FAB }} />;

          const isFocused = state.index === index;
          const onPress = () => navigation.navigate(route.name);

          return (
            <Pressable key={route.key} onPress={onPress} style={styles.tabBtn} hitSlop={10}>
              <Image
                source={getIcon(route.name, isFocused)}
                style={[styles.icon, { opacity: isFocused ? 1 : 0.55 }]}
                resizeMode="contain"
              />
            </Pressable>
          );
        })}
      </View>

      {/* Center FAB */}
      <Pressable
        onPress={() => navigation.navigate('launchpad')}
        style={[
          styles.fab,
          {
            bottom: insets.bottom + dims.TAB_HEIGHT - dims.FAB / 2,
          },
        ]}
        hitSlop={6}
      >
        <Image
          source={require('../../assets/icons/semicolon.png')}
          style={{ width: 34, height: 34, tintColor: colors.white }}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: spacing.xl,
    right: spacing.xl,
    height: dims.TAB_HEIGHT,
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  tabBtn: { width: 56, alignItems: 'center', justifyContent: 'center' },
  icon: { width: 28, height: 28 },
  fab: {
    position: 'absolute',
    left: '50%',
    marginLeft: -dims.FAB / 2,
    width: dims.FAB,
    height: dims.FAB,
    borderRadius: dims.FAB / 2,
    backgroundColor: colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
    zIndex: 2,
  },
});
