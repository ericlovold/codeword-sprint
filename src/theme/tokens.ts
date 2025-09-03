// src/theme/tokens.ts
export const colors = {
  purple: '#6E2DD0', // Brand Purple
  purpleDark: '#5923A8',
  mint: '#4BE3C1', // Semicolon accent
  surface: '#F7F3FB', // Tab bar surface
  text: '#1E1B2E',
  white: '#FFFFFF',
  // Gradient (from figma)
  gradA: '#B4A1E2', // top
  gradB: '#BDEBD9', // bottom

  // Legacy compatibility mappings
  brand: '#6E2DD0',
  brandDark: '#5923A8',
  brandFaint: '#EEE8F6',
  textSubtle: '#5E6172',
  bg: '#FFFFFF',
  tabBG: '#F7F3FB',
  tabIcon: '#A494B8',
  tabIconActive: '#6E2DD0',
  sendBG: '#6E2DD0',
  gray: '#8A8A8E',
  ink: '#1E1B2E',
  inputBg: '#F5F5F7',
  brandOn: '#FFFFFF',
  bubbleAI: '#FFFFFF',
  bubbleUser: '#6E2DD0',
  gradTop: '#B4A1E2',
  gradMid: '#B4ACD8',
  gradBot: '#BDEBD9',
};

export const radii = {
  xl: 28,
  lg: 20,
  md: 16,
  sm: 12,
  round: 999,
  // Legacy
  pill: 999,
  full: 999,
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 18,
  xl: 24,
  '2xl': 32,
  // Legacy
  xxl: 32,
};

export const dims = {
  TAB_HEIGHT: 72,
  FAB: 72,
  INPUT_H: 54,
};

export const space = {
  0: 0,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  14: 14,
  16: 16,
  20: 20,
  24: 24,
  28: 28,
  32: 32,
};

export const shadows = {
  tab: {
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -2 },
    elevation: 14,
  },
  fab: {
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 16,
  },
};

// Legacy export for compatibility
export const tokens = {
  colors,
  radii,
  space,
};

export const type = {
  h1: { fontSize: 28, lineHeight: 34, fontWeight: '700' as const },
  h2: { fontSize: 22, lineHeight: 28, fontWeight: '700' as const },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  chat: { fontSize: 17, lineHeight: 24, fontWeight: '500' as const },
  label: { fontSize: 14, lineHeight: 18, fontWeight: '600' as const },
};
