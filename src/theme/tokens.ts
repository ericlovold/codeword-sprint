export const tokens = {
  colors: {
    brand: '#6F31C5',
    brand900: '#4D2490',
    brandOn: '#FFFFFF',
    ink: '#2F2A4A',
    subInk: '#5A5A6B',
    gray: '#A6A6B0',
    bubbleUser: '#6F31C5',
    bubbleAI: '#FFFFFF',
    inputBg: '#F6F6F9',
    // gradient
    gradTop: '#B09AD6', // tweak to match figma
    gradMid: '#B4ACD8',
    gradBot: '#A6E3DD',
    // legacy support
    brand_old: {
      purple: '#5A2AA7',
      purpleDeep: '#4B2490',
      accent: '#8A64E8',
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
  },
  radii: { sm: 10, md: 16, lg: 20, xl: 24, pill: 28, full: 999 },
  space: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 },
  text: { h1: 24, h2: 20, body: 16, small: 13 },
  shadow: {
    card: {
      shadowColor: '#000',
      shadowOpacity: 0.12,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      elevation: 6,
    },
  },
};

// Legacy exports for compatibility
export const colors = tokens.colors;
export const gradient = {
  stops: ['#B49BE0', '#9DD6D1'],
  locations: [0, 1],
};
export const radii = tokens.radii;
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
  h1: { fontSize: 28, lineHeight: 34, fontWeight: '700' as const },
  h2: { fontSize: 22, lineHeight: 28, fontWeight: '700' as const },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  chat: { fontSize: 17, lineHeight: 24, fontWeight: '500' as const },
  label: { fontSize: 14, lineHeight: 18, fontWeight: '600' as const },
};
