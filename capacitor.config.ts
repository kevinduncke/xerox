import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.xerox.app',
  appName: 'Xerox',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000, // Duration in milliseconds
      launchAutoHide: true, // Automatically hide the splash screen
      backgroundColor: '#333333', // Dark background color
      androidScaleType: 'CENTER_CROP',
      androidSplashResourceName: 'splash-dark', // Use the dark splash screen for Android
      iosSplashResourceName: 'splash-dark', // Use the dark splash screen for iOS
    },    
  }
};

export default config;
