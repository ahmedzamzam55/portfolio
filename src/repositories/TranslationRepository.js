/**
 * Translation Repository
 * 
 * Repository Pattern — Data Access Layer for translations.
 * This is the ONLY place that knows WHERE translations come from.
 * 
 * Open/Closed: To add a new language, just create a new file
 * in data/translations/ and register it here.
 * 
 * Singleton: Exported as a single instance.
 */
import { en } from '../data/translations/en';
import { ar } from '../data/translations/ar';

const translationsMap = { en, ar };

class TranslationRepository {
  /**
   * Get translations for a specific language.
   * 
   * @param {string} lang - Language code ('en' | 'ar')
   * @returns {Object} Translation object for the given language
   */
  getTranslations(lang) {
    return translationsMap[lang] || translationsMap.en;
  }

  /**
   * Get all available language codes.
   * 
   * @returns {string[]} Available language codes
   */
  getAvailableLanguages() {
    return Object.keys(translationsMap);
  }

  /**
   * Check if a language is supported.
   * 
   * @param {string} lang - Language code to check
   * @returns {boolean}
   */
  isSupported(lang) {
    return lang in translationsMap;
  }
}

// Singleton export
export default new TranslationRepository();
