import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

.next-light-theme {
  --background: 251,251,253;
  --secondBackground: 255,255,255;
  --text: 10,18,30;
  --textSecondary: 255,255,255;
  --primary: 57,255,20; /* Neon Green */
  --secondary: 15,23,42; /* Dark Blue - REMOVED YELLOW */
  --tertiary: 231,241,251;
  --accent: 57,255,20; /* Neon Green */
  --accentOrange: 255,140,43; /* Orange accent */
  --cardBackground: 255,255,255;
  --inputBackground: 255,255,255;
  --navbarBackground: 255,255,255;
  --modalBackground: 251,251,253;
  --errorColor: 207,34,46;
  --logoColor: #39ff14;
  --glassmorphism: rgba(255, 255, 255, 0.1);
  --glassmorphismDark: rgba(255, 255, 255, 0.05);
}

.next-dark-theme {
  --background: 15,23,42;
  --secondBackground: 30,41,59;
  --text: 237,237,238;
  --textSecondary: 255,255,255;
  --primary: 57,255,20; /* Neon Green */
  --secondary: 255,140,43; /* Orange - REMOVED YELLOW */
  --tertiary: 15,23,42;
  --accent: 57,255,20; /* Neon Green */
  --accentOrange: 255,140,43; /* Orange accent */
  --cardBackground: 30,41,59;
  --inputBackground: 30,41,59;
  --navbarBackground: 15,23,42;
  --modalBackground: 15,23,42;
  --errorColor: 207,34,46;
  --logoColor: #39ff14;
  --glassmorphism: rgba(255, 255, 255, 0.1);
  --glassmorphismDark: rgba(0, 0, 0, 0.2);
}

:root {
  --font: 'Inter', 'Poppins', sans-serif;

  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  --glassmorphism-card: backdrop-filter: blur(10px);

  --z-sticky: 7777;
  --z-navbar: 8888;
  --z-drawer: 9999;
  --z-modal: 9999;
}

/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}

/* Remove list styles on ul, ol elements with a list role */
ul[role='list'],
ol[role='list'] {
  list-style: none;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
} 

html {
  -webkit-font-smoothing: antialiased;
  touch-action: manipulation;
  text-rendering: optimizeLegibility;
  text-size-adjust: 100%;
  font-size: 62.5%;

  @media (max-width: 37.5em) {
    font-size: 50%;
  }

  @media (max-width: 48.0625em) {
    font-size: 55%;
  }

  @media (max-width: 56.25em) {
    font-size: 60%;
  }
}

/* Set core body defaults */
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  font-family: var(--font);
  color: rgb(var(--text));
  background: rgb(var(--background));
  font-feature-settings: "kern";
  position: relative;
  overflow-x: hidden;
  padding-bottom: 250px;
}

/* Dynamic animated background - REMOVED YELLOW */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: linear-gradient(
    45deg,
    rgba(57, 255, 20, 0.1) 0%,
    rgba(255, 140, 43, 0.1) 25%,
    rgba(57, 255, 20, 0.05) 50%,
    rgba(255, 140, 43, 0.05) 75%,
    rgba(57, 255, 20, 0.1) 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Particle animation overlay - REMOVED YELLOW */
body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-image: 
    radial-gradient(circle at 20% 80%, rgba(57, 255, 20, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 140, 43, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(57, 255, 20, 0.2) 0%, transparent 50%);
  animation: particleFloat 20s ease-in-out infinite;
}

@keyframes particleFloat {
  0%, 100% { 
    transform: translate(0, 0) rotate(0deg);
    opacity: 0.7;
  }
  33% { 
    transform: translate(30px, -30px) rotate(120deg);
    opacity: 0.9;
  }
  66% { 
    transform: translate(-20px, 20px) rotate(240deg);
    opacity: 0.8;
  }
}

svg {
  color: rgb(var(--text));
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;