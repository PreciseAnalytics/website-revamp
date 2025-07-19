// utils/media.ts

const breakpoints = {
  phone: 576,
  tablet: 768,
  desktop: 1200,
  giant: 1440,
};

// Named helpers (optional)
export const media = {
  phone: (styles: string) => `@media (max-width: ${breakpoints.phone}px) { ${styles} }`,
  tablet: (styles: string) => `@media (max-width: ${breakpoints.tablet}px) { ${styles} }`,
  desktop: (styles: string) => `@media (max-width: ${breakpoints.desktop}px) { ${styles} }`,
  giant: (styles: string) => `@media (max-width: ${breakpoints.giant}px) { ${styles} }`,
};

// ✅ NEW: Function-based fallback
export const mq = (query: string, styles: string): string => {
  const direction = query.slice(0, 2); // <= or >=
  const key = query.slice(2);         // tablet, phone, etc.
  const bp = breakpoints[key as keyof typeof breakpoints];

  if (!bp) throw new Error(`Invalid breakpoint: ${key}`);
  if (!['<=', '>='].includes(direction)) throw new Error(`Invalid direction in query: ${query}`);

  const rule = direction === '<='
    ? `@media (max-width: ${bp}px)`
    : `@media (min-width: ${bp}px)`;

  return `
    ${rule} {
      ${styles}
    }
  `;
};

export default media;
