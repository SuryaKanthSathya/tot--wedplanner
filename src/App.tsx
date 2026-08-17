/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { View, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import { MobileLandingPage } from './components/MobileLandingPage';
import { OnboardingWizardModal } from './components/OnboardingWizardModal';
import { LoginModal } from './components/LoginModal';
import { ColorTheme, ViewMode } from './types';
import { THEMES } from './constants/themes';

export default function App() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [viewMode] = useState<ViewMode>('responsive-canvas');
  const [currentTheme] = useState<ColorTheme>('burgundy');
  const [isGetStartedOpen, setIsGetStartedOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [loginSuccessTrigger, setLoginSuccessTrigger] = useState<number>(0);
  const [loginEmail, setLoginEmail] = useState<string>('');

  const theme = THEMES[currentTheme];

  return (
    <SafeAreaView style={[styles.appContainer, isMobile ? styles.appContainerMobile : styles.appContainerDesktop]}>
      {/* Main Mobile Card Container */}
      <View style={[styles.mainCanvas, isMobile ? styles.mainCanvasMobile : styles.mainCanvasDesktop]}>
        <MobileLandingPage
          viewMode={viewMode}
          currentTheme={currentTheme}
          onOpenGetStarted={() => setIsGetStartedOpen(true)}
          onOpenLogin={() => setIsLoginOpen(true)}
          loginSuccessTrigger={loginSuccessTrigger}
          loginEmail={loginEmail}
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
        onLoginSuccess={(email) => {
          setIsLoginOpen(false);
          setLoginEmail(email);
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
  },
  appContainerDesktop: {
    minHeight: '100vh' as any,
    backgroundColor: '#1f1e1c',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  appContainerMobile: {
    width: '100%',
    minHeight: '100vh' as any,
    backgroundColor: '#FAF6EE',
    padding: 0,
  },
  mainCanvas: {
    flex: 1,
    width: '100%',
  },
  mainCanvasDesktop: {
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: '100vh' as any,
  },
  mainCanvasMobile: {
    height: '100%',
  },
});

