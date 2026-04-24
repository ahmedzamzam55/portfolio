/**
 * useLanguage Hook
 * 
 * Service Layer — Contains ALL language-related business logic.
 * Equivalent to LanguageService in Laravel.
 * 
 * Security:
 *   - Validates localStorage value against a whitelist before using it.
 *   - Prevents localStorage poisoning (e.g. if someone manually sets
 *     lang = '<script>alert(1)</script>' in devtools).
 * 
 * Single Responsibility: Only manages language state, direction, and translations.
 * Dependency Inversion: Uses TranslationRepository for data access.
 */
import { useState, useEffect } from 'react';
import TranslationRepository from '../repositories/TranslationRepository';

const ALLOWED_LANGS = ['en', 'ar'];
const DEFAULT_LANG   = 'en';

function getSafeLang() {
  try {
    const stored = localStorage.getItem('lang');
    return ALLOWED_LANGS.includes(stored) ? stored : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

export function useLanguage() {
  const [lang, setLang] = useState(getSafeLang);

  const t = TranslationRepository.getTranslations(lang);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    try {
      localStorage.setItem('lang', lang);
    } catch {
      // localStorage unavailable (e.g. private mode) — fail silently
    }
  }, [lang]);

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  return { lang, t, toggleLang };
}
