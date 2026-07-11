/**
 * Contact Repository
 * 
 * Repository Pattern — Data Access Layer.
 * This is the ONLY place that knows HOW to send contact data.
 * 
 * Security Features:
 *   - Sends data to server-side API (not directly to third-party)
 *   - Input sanitization before sending (XSS protection)
 *   - Service field whitelist — only allowed values pass through
 *   - API response body validated before trusting
 * 
 * Singleton: Exported as a single instance (new ContactRepository()).
 */
import { sanitize, isAllowedService } from '../validations/contactValidation';

const API_URL = '/api/contact';

class ContactRepository {
  /**
   * Submit contact form data to the server-side API.
   * All inputs are sanitized and validated before sending.
   * 
   * @param {Object} formData - { name, email, service, message }
   * @param {string} [turnstileToken] - Optional Turnstile verification token
   * @returns {Promise<Object>} API response
   */
  async submit(formData, turnstileToken = null) {
    // Sanitize all text inputs (XSS protection)
    const cleanName    = sanitize(formData.name);
    const cleanEmail   = sanitize(formData.email);
    const cleanMessage = sanitize(formData.message);

    // Whitelist the service — if not in allowed list, default to empty
    const service = isAllowedService(formData.service) ? formData.service : '';

    // Abort if sanitization removed all content from critical fields
    if (!cleanName || !cleanEmail || !cleanMessage) {
      throw new Error('Invalid input detected after sanitization');
    }

    const body = {
      name: cleanName,
      email: cleanEmail,
      service,
      message: cleanMessage,
    };

    // Include Turnstile token if available
    if (turnstileToken) {
      body.turnstileToken = turnstileToken;
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Submission failed: HTTP ${response.status}`);
    }

    const data = await response.json();

    // Validate the API response is what we expect
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid API response format');
    }

    return data;
  }
}

// Singleton export — same instance shared everywhere
export default new ContactRepository();
