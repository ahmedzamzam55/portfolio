/**
 * Project Repository
 * 
 * Repository Pattern — Data Access Layer for projects.
 * This is the ONLY source of truth for project data.
 * 
 * Liskov Substitution: If you later fetch projects from an API,
 * just change the internals here — all consumers stay unchanged.
 * 
 * Singleton: Exported as a single instance.
 */

class ProjectRepository {
  /**
   * Get all projects for the given language.
   * 
   * @param {Object} translations - The current language translations object
   * @returns {Array} List of all projects
   */
  getAll(translations) {
    return translations.projectList || [];
  }

  /**
   * Get projects filtered by category.
   * 
   * @param {Object} translations - The current language translations object
   * @param {string} category - The category to filter by ('all' | 'website' | 'webapp' | 'saas')
   * @returns {Array} Filtered list of projects
   */
  getByCategory(translations, category) {
    const all = this.getAll(translations);
    if (category === 'all') return all;
    return all.filter((project) => project.cat === category);
  }

  /**
   * Get available project categories.
   * 
   * @returns {string[]} List of category keys
   */
  getCategories() {
    return ['all', 'website', 'webapp', 'saas'];
  }

  /**
   * Get category labels for the given language.
   * 
   * @param {Object} translations - The current language translations object
   * @returns {Object} Category key-label mapping
   */
  getCategoryLabels(translations) {
    return {
      all: translations.projects.all,
      website: translations.projects.website,
      webapp: translations.projects.webapp,
      saas: translations.projects.saas,
    };
  }
}

// Singleton export
export default new ProjectRepository();
