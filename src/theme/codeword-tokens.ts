/**
 * Centralized Design Tokens for Codeword
 * Used by both React Native and SwiftUI implementations
 */

export const CODEWORD_TOKENS = {
  colors: {
    // Primary brand colors
    brandPurple: '#7B2EFF',
    brandTeal: '#36D1DC',

    // Text colors
    textPrimary: '#101114',
    textSubtle: '#6B6E76',

    // Bubble colors
    bubbleUserBg: '#5C2DCB',
    bubbleUserText: '#FFFFFF',
    bubbleAiBg: '#FFFFFF',
    bubbleAiText: '#1B1D22',

    // Navigation colors
    navActive: '#7B2EFF',
    navInactive: '#A7AAB2',

    // Input colors
    inputBg: '#FFFFFF',
    inputPlaceholder: '#B6BAC3',

    // Surface colors
    white: '#FFFFFF',
    tabBarBg: '#FFFFFF',
  },

  dimensions: {
    headerHeight: 56,
    tabBarHeight: 66,
    fabSize: 56,
    fabOffset: 22,
  },

  radii: {
    bubble: 16,
    input: 20,
    button: 20,
    tabBar: 20,
  },

  spacing: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 24,
  },

  typography: {
    title: 20,
    body: 14,
    small: 10,
  },

  shadows: {
    bubble: {
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 3,
    },
    input: {
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    fab: {
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 8 },
      elevation: 6,
    },
    tabBar: {
      shadowColor: '#000',
      shadowOpacity: 0.06,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: -2 },
      elevation: 8,
    },
  },
};
