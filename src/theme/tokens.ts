export const colors = {
  brand: '#6F34D3', // Codeword purple (tweak if needed)
  brandDark: '#5A27B0',
  brandFaint: '#EEE8F6',
  text: '#222443',
  textSubtle: '#5E6172',
  bg: '#FFFFFF',
  tabBG: '#FBF9FC',
  tabIcon: '#A494B8',
  tabIconActive: '#6F34D3',
  sendBG: '#6F34D3',
  // Legacy compatibility
  gray: '#8A8A8E',
  ink: '#2F2A4A',
  inputBg: '#F5F5F7',
  brandOn: '#FFFFFF',
  bubbleAI: '#FFFFFF',
  bubbleUser: '#6F34D3',
  gradTop: '#B09AD6',
  gradMid: '#B4ACD8',
  gradBot: '#A6E3DD',
};

export const radii = {
  xl: 24,
  lg: 20,
  md: 16,
  sm: 10,
  pill: 999,
  full: 999,
};

export const spacing = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
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
