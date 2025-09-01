// src/theme/tokens.ts
export const colors = {
  brand: {
    purple: '#5A2AA7', // App bar, primary buttons
    purpleDeep: '#4B2490', // Bubble/active accents
    accent: '#8A64E8', // Secondary accents (optional)
  },
  text: {
    primary: '#1D1235',
    secondary: '#3A2F57',
    onPurple: '#FFFFFF',
  },
  ui: {
    white: '#FFFFFF',
    card: '#FFFFFF',
    bgSoft: '#F7F3FB',
    divider: 'rgba(0,0,0,0.06)',
  },
};

export const gradient = {
  // Matches your "Gradient BG.png": purple top-left → aqua bottom-right
  stops: ['#B49BE0', '#9DD6D1'], // refine with Figma's exact stops
  locations: [0, 1],
};

export const radii = {
  xl: 24,
  lg: 20,
  md: 16,
  sm: 12,
  pill: 999,
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

export const type = {
  // Use SF on iOS; if you'll ship custom font later, wire it here.
  h1: { fontSize: 28, lineHeight: 34, fontWeight: '700' as const },
  h2: { fontSize: 22, lineHeight: 28, fontWeight: '700' as const },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  chat: { fontSize: 17, lineHeight: 24, fontWeight: '500' as const }, // bubbles
  label: { fontSize: 14, lineHeight: 18, fontWeight: '600' as const },
};
