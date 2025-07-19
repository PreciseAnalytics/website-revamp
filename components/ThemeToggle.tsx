'use client';

import { useThemeContext } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        padding: '10px 16px',
        borderRadius: '8px',
        backgroundColor: theme === 'dark' ? '#f0f0f0' : '#222',
        color: theme === 'dark' ? '#222' : '#fff',
        border: 'none',
        fontWeight: 'bold',
        cursor: 'pointer',
        zIndex: 10001,
        transition: 'background-color 0.3s ease',
      }}
    >
      {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
