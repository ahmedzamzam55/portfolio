import { useState, useEffect } from 'react';
import { AppContext } from './AppContext';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * AppProvider — equivalent to ServiceProvider::register()
 * Wraps the entire app and provides shared state.
 */
export function AppProvider({ children }) {
  const { theme, toggleTheme } = useTheme();
  const { lang, t, toggleLang } = useLanguage();
  const [loading, setLoading] = useState(true);

  // Loading timer
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll animations — activated after loading completes
  useScrollAnimation(!loading);

  // Re-trigger animations on language change
  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        el.classList.add('visible');
      });
    }, 100);
    return () => clearTimeout(timer);
  }, [lang, loading]);

  const value = {
    theme,
    toggleTheme,
    lang,
    t,
    toggleLang,
    loading,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
