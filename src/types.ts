export type ColorTheme = 'burgundy' | 'emerald' | 'midnight' | 'rosegold';

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  bgLight: string;
  textDark: string;
  textMuted: string;
  accent: string;
  name: string;
}

export type ViewMode = 'mobile-frame' | 'responsive-canvas';

export interface WeddingPreferences {
  style: string;
  guestCount: string;
  season: string;
  location: string;
  budgetRange: string;
  hasPlanner: boolean;
}
