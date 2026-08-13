/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { MobileLandingPage } from './components/MobileLandingPage';
import { OnboardingWizardModal } from './components/OnboardingWizardModal';
import { LoginModal } from './components/LoginModal';
import { ColorTheme, ViewMode } from './types';
import { THEMES } from './constants/themes';

export default function App() {
  const [viewMode] = useState<ViewMode>('responsive-canvas');
  const [currentTheme] = useState<ColorTheme>('burgundy');
  const [isGetStartedOpen, setIsGetStartedOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [loginSuccessTrigger, setLoginSuccessTrigger] = useState<number>(0);

  const theme = THEMES[currentTheme];

  return (
    <SafeAreaView style={styles.appContainer}>
      {/* Main Mobile Card Container */}
      <View style={styles.mainCanvas}>
        <MobileLandingPage
          viewMode={viewMode}
          currentTheme={currentTheme}
          onOpenGetStarted={() => setIsGetStartedOpen(true)}
          onOpenLogin={() => setIsLoginOpen(true)}
          loginSuccessTrigger={loginSuccessTrigger}
        />
      </View>

      {/* Interactive React Native Modals */}
      <OnboardingWizardModal
        isOpen={isGetStartedOpen}
        onClose={() => setIsGetStartedOpen(false)}
        primaryColor={theme.primary}
        bgColor={theme.bgLight}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={() => {
          setIsLoginOpen(false);
          setLoginSuccessTrigger((prev) => prev + 1);
        }}
        primaryColor={theme.primary}
        bgColor={theme.bgLight}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    minHeight: '100vh' as any,
    backgroundColor: '#1f1e1c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  mainCanvas: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxHeight: '100vh' as any,
  },
});

