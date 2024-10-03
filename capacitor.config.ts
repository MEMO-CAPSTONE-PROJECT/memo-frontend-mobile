import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.capstone.memo',
  appName: 'Memo',
  webDir: 'out',
  server: {
    url: 'http://192.168.2.38:3000',
    cleartext: true,
    allowNavigation: ["*"]
  }
};

export default config;
