export type CookieConsent = {
  necessary: true;
  performance: boolean;
  functional: boolean;
  targeting: boolean;
  timestamp: number;
};

const KEY = 'cookie-consent';

export function saveConsent(consent: CookieConsent) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(consent));
}

export function loadConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearConsent() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(KEY);
}
