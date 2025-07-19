import { createContext, useContext, useEffect, useState } from 'react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const defaultPrefs: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  functional: false,
};

const CookieConsentContext = createContext<CookiePreferences>(defaultPrefs);

export const CookieConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPrefs);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cookiePreferences');
      if (stored) {
        setPreferences(JSON.parse(stored));
      }
    } catch (err) {
      console.error('Error reading cookie preferences:', err);
    }
  }, []);

  return (
    <CookieConsentContext.Provider value={preferences}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookiePreferences = () => useContext(CookieConsentContext);
