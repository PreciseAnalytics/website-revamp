// utils/media.ts
import { css, FlattenSimpleInterpolation } from 'styled-components';

const breakpoints = {
  phone: 576,
  tablet: 768,
  desktop: 1200,
  giant: 1440,
};

// Template literal style media queries (for AnimatedFooter)
const templateMedia: Record<keyof typeof breakpoints, (l: TemplateStringsArray, ...p: any[]) => any> = {
  phone: (l, ...p) => css`
    @media (max-width: ${breakpoints.phone}px) {
      ${css(l, ...p)}
    }
  `,
  tablet: (l, ...p) => css`
    @media (max-width: ${breakpoints.tablet}px) {
      ${css(l, ...p)}
    }
  `,
  desktop: (l, ...p) => css`
    @media (max-width: ${breakpoints.desktop}px) {
      ${css(l, ...p)}
    }
  `,
  giant: (l, ...p) => css`
    @media (max-width: ${breakpoints.giant}px) {
      ${css(l, ...p)}
    }
  `,
};

// Function style media queries (for SolutionCard)
function mediaFunction(query: string): (l: TemplateStringsArray, ...p: any[]) => FlattenSimpleInterpolation {
  const cleanQuery = query.replace('<=', '').replace('>=', '').trim();
  const breakpoint = breakpoints[cleanQuery as keyof typeof breakpoints];
  
  if (!breakpoint) {
    console.warn(`Unknown breakpoint: ${cleanQuery}`);
    return () => css``;
  }
  
  if (query.includes('<=')) {
    return (l, ...p) => css`
      @media (max-width: ${breakpoint}px) {
        ${css(l, ...p)}
      }
    `;
  } else if (query.includes('>=')) {
    return (l, ...p) => css`
      @media (min-width: ${breakpoint}px) {
        ${css(l, ...p)}
      }
    `;
  }
  
  // Default to max-width
  return (l, ...p) => css`
    @media (max-width: ${breakpoint}px) {
      ${css(l, ...p)}
    }
  `;
}

// Create combined media object that works as both function and object
const media = Object.assign(mediaFunction, templateMedia);

export { media };
export default media;