import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ColorTheme, ViewMode } from '../types';
import { THEMES } from '../constants/themes';
import { Smartphone, Monitor, Palette, Check, Copy } from 'lucide-react';

interface DesignInspectorProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  currentTheme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
  onOpenGetStarted: () => void;
  onOpenLogin: () => void;
}

export const DesignInspector: React.FC<DesignInspectorProps> = ({
  viewMode,
  setViewMode,
  currentTheme,
  setTheme,
}) => {
  const [showTokens, setShowTokens] = useState(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const themeConfig = THEMES[currentTheme];

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <View style={styles.topBarContainer}>
      <View style={styles.contentRow}>
        {/* App Title & Design System Indicator */}
        <View style={styles.leftBrandSection}>
          <View style={styles.titleWrapper}>
            <View style={styles.pulseDot} />
            <Text style={styles.brandTitleText}>Tale of Two</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>React Native UI</Text>
            </View>
          </View>

          <View style={styles.colorSpecsRow}>
            <Text style={styles.specLabel}>Primary:</Text>
            <TouchableOpacity
              onPress={() => handleCopy(themeConfig.primary)}
              style={styles.hexBtn}
            >
              <View style={[styles.colorDot, { backgroundColor: themeConfig.primary }]} />
              <Text style={styles.hexText}>{themeConfig.primary}</Text>
              {copiedHex === themeConfig.primary ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-2.5 h-2.5 text-stone-400" />
              )}
            </TouchableOpacity>

            <Text style={styles.specLabel}>Bg:</Text>
            <TouchableOpacity
              onPress={() => handleCopy(themeConfig.bgLight)}
              style={styles.hexBtn}
            >
              <View style={[styles.colorDot, { backgroundColor: themeConfig.bgLight }]} />
              <Text style={styles.hexText}>{themeConfig.bgLight}</Text>
              {copiedHex === themeConfig.bgLight ? (
                <Check className="w-3 h-3 text-emerald-400" />
              ) : (
                <Copy className="w-2.5 h-2.5 text-stone-400" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* View Mode Toggle & Theme Selector */}
        <View style={styles.rightControlSection}>
          {/* Theme Palette Switcher */}
          <View style={styles.themePaletteRow}>
            {(Object.keys(THEMES) as ColorTheme[]).map((tKey) => {
              const themeItem = THEMES[tKey];
              const isActive = currentTheme === tKey;
              return (
                <div key={tKey}>
                  <TouchableOpacity
                    onPress={() => setTheme(tKey)}
                    style={[
                      styles.themeDotBtn,
                      { backgroundColor: themeItem.primary },
                      isActive && styles.themeDotActive,
                    ]}
                  >
                    {isActive && <View style={styles.activeDotInner} />}
                  </TouchableOpacity>
                </div>
              );
            })}
          </View>

          {/* View Mode */}
          <View style={styles.viewModeToggleGroup}>
            <TouchableOpacity
              onPress={() => setViewMode('mobile-frame')}
              style={[
                styles.modeBtn,
                viewMode === 'mobile-frame' && styles.modeBtnActive,
              ]}
            >
              <Smartphone className="w-3.5 h-3.5 text-amber-200" />
              <Text style={[styles.modeBtnText, viewMode === 'mobile-frame' && styles.modeBtnTextActive]}>
                Phone
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setViewMode('responsive-canvas')}
              style={[
                styles.modeBtn,
                viewMode === 'responsive-canvas' && styles.modeBtnActive,
              ]}
            >
              <Monitor className="w-3.5 h-3.5 text-amber-200" />
              <Text style={[styles.modeBtnText, viewMode === 'responsive-canvas' && styles.modeBtnTextActive]}>
                Canvas
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tokens Inspector Toggle */}
          <TouchableOpacity
            onPress={() => setShowTokens(!showTokens)}
            style={styles.tokensToggleBtn}
          >
            <Palette className="w-4 h-4 text-stone-300" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Design Specs Drawer */}
      {showTokens && (
        <View style={styles.specsDrawer}>
          <View style={styles.specCard}>
            <Text style={styles.specCardTitle}>Native Architecture</Text>
            <Text style={styles.specCardBody}>React Native Core Primitives</Text>
            <Text style={styles.specCardBody}>react-native-web compilation</Text>
          </View>
          <View style={styles.specCard}>
            <Text style={styles.specCardTitle}>Ratio Split</Text>
            <Text style={styles.specCardBody}>Top Photo: 55% height</Text>
            <Text style={styles.specCardBody}>Bottom Container: 45% height</Text>
          </View>
          <View style={styles.specCard}>
            <Text style={styles.specCardTitle}>Color Tokens</Text>
            <Text style={styles.specCardBody}>Burgundy Heading: #5C1A24</Text>
            <Text style={styles.specCardBody}>Cream Container: #FFFBF7</Text>
          </View>
          <View style={styles.specCard}>
            <Text style={styles.specCardTitle}>Typography</Text>
            <Text style={styles.specCardBody}>Serif: Cormorant Garamond</Text>
            <Text style={styles.specCardBody}>Sans: Plus Jakarta Sans</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topBarContainer: {
    width: '100%',
    backgroundColor: 'rgba(28, 25, 23, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#292524',
    paddingHorizontal: 16,
    paddingVertical: 10,
    zIndex: 40,
  },
  contentRow: {
    maxWidth: 1200,
    marginHorizontal: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  leftBrandSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 9999,
    backgroundColor: '#f59e0b',
  },
  brandTitleText: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 18,
    fontWeight: '700',
    color: '#fef3c7',
  },
  badge: {
    backgroundColor: '#292524',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#44403c',
  },
  badgeText: {
    fontSize: 10,
    color: '#a8a29e',
  },
  colorSpecsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingLeft: 12,
    borderLeftWidth: 1,
    borderLeftColor: '#292524',
  },
  specLabel: {
    fontSize: 11,
    color: '#a8a29e',
  },
  hexBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#292524',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 4,
    borderWidth: 1,
    borderColor: '#44403c',
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 9999,
  },
  hexText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#e7e5e4',
  },
  rightControlSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  themePaletteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#292524',
    padding: 4,
    borderRadius: 12,
    gap: 4,
    borderWidth: 1,
    borderColor: '#44403c',
  },
  themeDotBtn: {
    width: 22,
    height: 22,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeDotActive: {
    borderWidth: 2,
    borderColor: '#fbbf24',
  },
  activeDotInner: {
    width: 6,
    height: 6,
    borderRadius: 9999,
    backgroundColor: '#FFFFFF',
  },
  viewModeToggleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#292524',
    padding: 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#44403c',
  },
  modeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  modeBtnActive: {
    backgroundColor: 'rgba(120, 53, 15, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(180, 83, 9, 0.5)',
  },
  modeBtnText: {
    fontSize: 11,
    color: '#a8a29e',
  },
  modeBtnTextActive: {
    color: '#fef3c7',
    fontWeight: '700',
  },
  tokensToggleBtn: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: '#292524',
    borderWidth: 1,
    borderColor: '#44403c',
  },
  specsDrawer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#292524',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specCard: {
    flex: 1,
    minWidth: 140,
    backgroundColor: 'rgba(41, 37, 36, 0.8)',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#44403c',
  },
  specCardTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fef3c7',
    marginBottom: 4,
  },
  specCardBody: {
    fontSize: 10,
    color: '#d6d3d1',
  },
});
