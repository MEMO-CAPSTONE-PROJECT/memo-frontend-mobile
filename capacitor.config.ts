import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'com.capstone.memo',
  appName: 'Memo',
  webDir: 'out',
  server: {
    url: 'http://192.168.3.24:3000',
    cleartext: true,
    allowNavigation: ["*"]
  },
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Body,
      style: KeyboardStyle.Dark,
      resizeOnFullScreen: true,
    }
  }
};

export default config;
