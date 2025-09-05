export const COLORS = {
  // Primary colors from Figma
  purple: '#7B3FF2', // Main purple from header
  mint: '#4BE3C1', // Mint/teal for semicolon
  white: '#FFFFFF',
  black: '#000000',

  // Gradient colors from Figma
  gradientStart: '#B4A1E2', // Light purple
  gradientEnd: '#A8E6CF', // Light mint/green

  // Surface colors
  surface: 'rgba(255, 255, 255, 0.95)', // Tab bar background
  surfaceLight: '#F7F3FB',

  // Text colors
  textPrimary: '#1A1A1A',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',

  // Message bubbles
  userBubble: '#7B3FF2',
  aiBubble: '#FFFFFF',
};

export const DIMENSIONS = {
  BRAND_H: 56, // Header height
  TAB_HEIGHT: 72, // Tab bar height
  FAB: 56, // FAB size
  INPUT_H: 54, // Input height
};

export const TYPOGRAPHY = {
  head: {
    fontSize: 28,
    fontWeight: '600' as const,
    letterSpacing: -0.5,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  small: {
    fontSize: 12,
    lineHeight: 16,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const RADII = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
};

// Backward compatibility exports
export const colors = {
  ...COLORS,
  // Map old names to new
  gradA: COLORS.gradientStart,
  gradB: COLORS.gradientEnd,
  brandOn: COLORS.white,
  bubbleAI: COLORS.aiBubble,
  bubbleUser: COLORS.userBubble,
  gray: COLORS.textMuted,
  inputBg: COLORS.surfaceLight,
  sendBG: COLORS.purple,
  tabBG: COLORS.surfaceLight,
  text: COLORS.textPrimary,
  textSubtle: COLORS.textSecondary,
  brand: COLORS.purple,
  brandFaint: COLORS.surfaceLight,
  ink: COLORS.textPrimary,
};

export const dims = DIMENSIONS;
export const spacing = SPACING;
export const radii = { ...RADII, pill: RADII.full };
export const type = TYPOGRAPHY;
