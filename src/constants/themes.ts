import { ColorTheme, ThemeColors } from '../types';

export const THEMES: Record<ColorTheme, ThemeColors> = {
  burgundy: {
    name: 'Deep Burgundy & Cream',
    primary: '#5C1A24',
    primaryHover: '#42121A',
    bgLight: '#FFFBF7',
    textDark: '#5C1A24',
    textMuted: '#6E6764',
    accent: '#D4AF37',
  },
  emerald: {
    name: 'Emerald Velvet & Ivory',
    primary: '#1B3B2B',
    primaryHover: '#12281D',
    bgLight: '#F8F9F5',
    textDark: '#1B3B2B',
    textMuted: '#636B66',
    accent: '#C5A059',
  },
  midnight: {
    name: 'Royal Midnight & Silk',
    primary: '#141E30',
    primaryHover: '#0D1320',
    bgLight: '#FAFAFC',
    textDark: '#141E30',
    textMuted: '#687282',
    accent: '#E5C158',
  },
  rosegold: {
    name: 'Rose Gold & Blush',
    primary: '#7A3B43',
    primaryHover: '#5B2A30',
    bgLight: '#FFF8F6',
    textDark: '#7A3B43',
    textMuted: '#78686B',
    accent: '#E0A899',
  },
};
