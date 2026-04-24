/**
 * Contact Repository
 * 
 * Repository Pattern — Data Access Layer.
 * This is the ONLY place that knows HOW to send contact data.
 * 
 * Security Features:
 *   - Input sanitization before sending (XSS protection)
 *   - Service field whitelist — only allowed values pass through
 *   - Captcha disabled (FormSubmit handles it server-side)
 *   - Auto-response disabled to prevent abuse
 *   - API response body validated before trusting
 * 
 * Singleton: Exported as a single instance (new ContactRepository()).
 */
import { sanitize, isAllowedService } from '../validations/contactValidation';

const API_URL = 'https://formsubmit.co/ajax/zahmd8920@gmail.com';

// Allowed service display labels (sent in email)
const SERVICE_LABELS = {
  basic: 'Basic Package',
  professional: 'Professional Package',
  enterprise: 'Enterprise Package',
  custom: 'Custom Project',
  '': 'Not specified',
};

class ContactRepository {
  /**
   * Submit contact form data to the email service.
   * All inputs are sanitized and validated before sending.
   * 
   * @param {Object} formData - { name, email, service, message }
   * @returns {Promise<Object>} API response
   */
  async submit(formData) {
    // Sanitize all text inputs (XSS protection)
    const cleanName    = sanitize(formData.name);
    const cleanEmail   = sanitize(formData.email);
    const cleanMessage = sanitize(formData.message);

    // Whitelist the service — if not in allowed list, default to empty
    const service = isAllowedService(formData.service) ? formData.service : '';
    const cleanService = SERVICE_LABELS[service];

    // Abort if sanitization removed all content from critical fields
    if (!cleanName || !cleanEmail || !cleanMessage) {
      throw new Error('Invalid input detected after sanitization');
    }

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: cleanName,
        email: cleanEmail,
        service: cleanService,
        message: cleanMessage,
        _subject: `Portfolio Contact: ${cleanName}`,
        _captcha: false,
        _template: 'table',
        _autoresponse: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Submission failed: HTTP ${response.status}`);
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
