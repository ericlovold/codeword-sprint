// Replace the Color("…") style names with YOUR DS tokens if you're pulling from a generated file.
// For now, keep fallback hexes so it renders immediately.

export const COLORS = {
  // brand colors - exact web values
  brandP: '#642975', // token: color-brand-primary (web purple)
  brandT: '#4BE3C1', // token: color-brand-teal (semicolon teal)

  // text
  text: '#101114',
  textSubtle: '#6B6E76',

  // chat bubbles
  bubbleUserBg: '#642975', // token: color-bubble-user-bg (matches brand)
  bubbleUserText: '#FFFFFF', // token: color-bubble-user-text
  bubbleAiBg: '#FFFFFF', // token: color-bubble-ai-bg
  bubbleAiText: '#1B1D22', // token: color-bubble-ai-text

  // input
  inputBg: '#FFFFFF', // token: color-input-bg
  inputPlaceholder: '#B6BAC3', // token: color-input-placeholder

  // nav
  navIconInactive: '#A7AAB2', // token: color-icon-inactive
  navIconActive: '#642975', // token: color-icon-active (web purple)

  // surfaces
  white: '#FFFFFF',
  pageBg: '#FFFFFF',
} as const;

export const RADII = {
  bubble: 16,
  input: 20,
  tab: 20,
} as const;

export const TYPE = {
  title: 20,
  body: 14,
  tab: 10,
} as const;

export const HEADER = { height: 56 } as const;
