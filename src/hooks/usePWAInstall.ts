import { useState, useEffect } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export type DetectedPlatform = 'android' | 'ios' | 'windows' | 'mac' | 'linux' | 'other';

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [installStatus, setInstallStatus] = useState<'idle' | 'installing' | 'success' | 'dismissed' | 'unsupported'>('idle');
  const [platform, setPlatform] = useState<DetectedPlatform>('other');
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 1. Detect standalone mode (already running as installed PWA)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://');
    setIsInstalled(isStandalone);

    // 2. Detect platform & device
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua) || (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);
    const isAndroidDevice = /android/.test(ua);
    const isMobileDevice = isIOSDevice || isAndroidDevice || /mobile|tablet|phone/.test(ua);

    setIsIOS(isIOSDevice);
    setIsAndroid(isAndroidDevice);
    setIsMobile(isMobileDevice);

    if (isAndroidDevice) {
      setPlatform('android');
    } else if (isIOSDevice) {
      setPlatform('ios');
    } else if (/windows/.test(ua)) {
      setPlatform('windows');
    } else if (/macintosh|mac os x/.test(ua)) {
      setPlatform('mac');
    } else if (/linux/.test(ua)) {
      setPlatform('linux');
    } else {
      setPlatform('other');
    }

    // 3. Listen for browser install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
      setInstallStatus('success');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = async (): Promise<boolean> => {
    if (!deferredPrompt) {
      if (isIOS) {
        setInstallStatus('unsupported');
        return false;
      }
      return false;
    }

    setInstallStatus('installing');
    try {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
        setIsInstallable(false);
        setDeferredPrompt(null);
        setInstallStatus('success');
        return true;
      } else {
        setInstallStatus('dismissed');
        return false;
      }
    } catch (err) {
      console.error('PWA Installation error:', err);
      setInstallStatus('dismissed');
      return false;
    }
  };

  return {
    isInstallable,
    isInstalled,
    installStatus,
    setInstallStatus,
    platform,
    isIOS,
    isAndroid,
    isMobile,
    install,
    hasDeferredPrompt: !!deferredPrompt
  };
}
