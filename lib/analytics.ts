let initialized = false;

export function loadGA(measurementId: string) {
  if (typeof window === 'undefined' || initialized) return;

  initialized = true;

  // Inject GA script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
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
    send_page_view: true,  // Initial page load
  });
}
