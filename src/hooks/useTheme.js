/**
 * useTheme Hook
 * 
 * Service Layer — Contains ALL theme-related business logic.
 * Equivalent to ThemeService in Laravel.
 * 
 * Security:
 *   - Validates localStorage value against a whitelist before using it.
 *   - Prevents localStorage poisoning attacks.
 * 
 * Single Responsibility: Only manages theme state and persistence.
 */
import { useState, useEffect } from 'react';

const ALLOWED_THEMES = ['dark', 'light'];
const DEFAULT_THEME   = 'dark';

function getSafeTheme() {
  try {
    const stored = localStorage.getItem('theme');
    return ALLOWED_THEMES.includes(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(getSafeTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update favicon dynamically based on theme
    const favicon = document.querySelector('link[rel="icon"]');
    const appleIcon = document.querySelector('link[rel="apple-touch-icon"]');
    const logoPath = theme === 'dark' ? '/logo_dark.png' : '/logo_light.png';
    
    if (favicon) favicon.setAttribute('href', logoPath);
    if (appleIcon) appleIcon.setAttribute('href', logoPath);

    try {
      localStorage.setItem('theme', theme);
    } catch {
      // localStorage unavailable — fail silently
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
