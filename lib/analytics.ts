let initialized = false;

export function loadGA(measurementId: string) {
  if (typeof window === 'undefined') {
    console.log('[GA] Skipped: running on server');
    return;
  }
  
  if (initialized) {
    console.log('[GA] Skipped: already initialized');
    return;
  }

  initialized = true;
  console.log('[GA] Initializing Google Analytics:', measurementId);

  // Inject GA script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  
  script.onload = () => {
    console.log('[GA] Script loaded successfully');
  };
  
  script.onerror = () => {
    console.error('[GA] Failed to load script - may be blocked by ad blocker');
    initialized = false; // Allow retry
  };
  
  document.head.appendChild(script);

  // Init dataLayer
  (window as any).dataLayer = (window as any).dataLayer || [];
  
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }

  // Expose gtag globally
  (window as any).gtag = gtag;

  gtag('js', new Date());

  gtag('config', measurementId, {
    anonymize_ip: true,     // GDPR-safe
    send_page_view: true,   // Initial page load
  });

  console.log('[GA] Configuration complete');
}

// Helper to check if GA is active (useful for debugging)
export function isGALoaded(): boolean {
  return typeof window !== 'undefined' && !!(window as any).gtag;
}