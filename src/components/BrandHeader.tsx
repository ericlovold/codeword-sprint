import React, { memo } from 'react';
import { View, Text, Image, Pressable, Platform, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

/** ---- Brand tokens (fallbacks if you don't have a tokens module) ---- */
const PURPLE = '#6F31C5';
const PURPLE_DARK = '#5A2BA8';
const TEXT_ON_PURPLE = '#FFFFFF';
const RADIUS_XL = 24;

type BrandHeaderProps = {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightIcon?: any; // optional PNG
  onRightPress?: () => void;
};

const SEMICOLON =
  // Prefer the transparent purple glyph; fallback to white + tint if needed
  // require("../../app/assets/icons/SemicolonIconPurple.png");
  require('../../app/assets/icons/White Semicolon.png');

function BrandHeaderInner({
  title = 'Codeword',
  showBack = false,
  onBackPress,
  rightIcon,
  onRightPress,
}: BrandHeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const HEADER_H = 64; // content area height (plus safe area)
  const totalH = HEADER_H + insets.top;

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: PURPLE }} pointerEvents="box-none">
      <LinearGradient
        colors={[PURPLE, PURPLE_DARK]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.header,
          {
            height: totalH,
            paddingTop: insets.top,
          },
        ]}
      >
        {/* Left: Back */}
        <View style={styles.side}>
          {showBack && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back"
              onPress={onBackPress ?? (() => router.back())}
              style={styles.backBtn}
              hitSlop={10}
            >
              <Text style={styles.backGlyph}>‹</Text>
            </Pressable>
          )}
        </View>

        {/* Center: Wordmark + semicolon */}
        <View style={styles.centerWrap}>
          <Text numberOfLines={1} style={styles.titleText}>
            {title}
          </Text>
          {title === 'Codeword' && (
            <Image
              source={SEMICOLON}
              style={styles.semi}
              // Tint if using white asset
              // @ts-ignore
              tintColor={TEXT_ON_PURPLE}
            />
          )}
        </View>

        {/* Right: optional action */}
        <View style={[styles.side, { alignItems: 'flex-end' }]}>
          {rightIcon && (
            <Pressable onPress={onRightPress} hitSlop={10} style={styles.rightBtn}>
              <Image source={rightIcon} style={{ width: 24, height: 24 }} />
            </Pressable>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    borderBottomLeftRadius: RADIUS_XL,
    borderBottomRightRadius: RADIUS_XL,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 12 },
    }),
  },
  side: {
    width: 56,
    height: 40,
    justifyContent: 'center',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backGlyph: {
    color: TEXT_ON_PURPLE,
    fontSize: 28,
    marginTop: -2,
    fontWeight: '600',
  },
  centerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    gap: 6,
  },
  titleText: {
    color: TEXT_ON_PURPLE,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  semi: {
    width: 14,
    height: 20,
    resizeMode: 'contain',
    marginBottom: -2, // better baseline alignment
  },
  rightBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(BrandHeaderInner);
