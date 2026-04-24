/**
 * Contact Form Validation
 * 
 * Equivalent to Laravel's FormRequest class.
 * - contactRules    = rules() method
 * - contactMessages = messages() method
 * - validateContactForm = The validation execution
 * - sanitize = Input sanitization (security layer)
 * 
 * Single Responsibility: This file ONLY handles validation logic.
 * Open/Closed: Add new fields/rules without changing the component.
 */

// Allowed service values — Whitelist approach (most secure)
const ALLOWED_SERVICES = ['', 'basic', 'professional', 'enterprise', 'custom'];

/**
 * Sanitize input — strips HTML tags to prevent XSS injection.
 * Uses iterative stripping to defeat nested-tag bypass attacks.
 * Equivalent to Laravel's strip_tags() / e() helper.
 * 
 * Attack example stopped:
 *   <scr<script>ipt>alert(1)</scr</script>ipt>
 *   After 1 pass: <script>alert(1)</script>  ← STILL DANGEROUS
 *   After 2 passes: alert(1)                 ← SAFE ✓
 * 
 * @param {string} input - Raw user input
 * @returns {string} Sanitized input
 */
export function sanitize(input) {
  if (typeof input !== 'string') return '';

  let sanitized = input;
  let prev;

  // Iterative stripping — defeats nested/obfuscated tag injection
  do {
    prev = sanitized;
    sanitized = sanitized
      .replace(/<[^>]*>/g, '')                   // Strip all HTML tags
      .replace(/&lt;/gi, '')                     // Block decoded < 
      .replace(/&gt;/gi, '')                     // Block decoded >
      .replace(/&amp;/gi, '')                    // Block decoded &
      .replace(/&#x[0-9a-f]+;/gi, '')            // Block hex HTML entities
      .replace(/&#[0-9]+;/gi, '')                // Block decimal HTML entities
      .replace(/javascript\s*:/gi, '')           // Remove javascript: protocol (with spaces)
      .replace(/vbscript\s*:/gi, '')             // Remove vbscript: protocol
      .replace(/data\s*:/gi, '')                 // Remove data: URI (can carry JS)
      .replace(/on\w+\s*=/gi, '');              // Remove event handlers (onclick=, onload=, etc.)
  } while (sanitized !== prev);

  return sanitized.trim();
}

/**
 * Validate service value against allowed whitelist.
 * Prevents injection through the select dropdown.
 * 
 * @param {string} value
 * @returns {boolean}
 */
export function isAllowedService(value) {
  return ALLOWED_SERVICES.includes(value);
}

// Validation Rules — equivalent to FormRequest::rules()
const contactRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100,
  },
  email: {
    required: true,
    maxLength: 254,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  service: {
    required: false,
    whitelist: ALLOWED_SERVICES,
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 5000,
  },
};

// Validation Messages — equivalent to FormRequest::messages()
const contactMessages = {
  en: {
    name: {
      required: 'Name is required',
      minLength: 'Name is too short',
      maxLength: 'Name is too long (max 100 characters)',
    },
    email: {
      required: 'Email is required',
      pattern: 'Invalid email address',
      maxLength: 'Email is too long',
    },
    service: {
      whitelist: 'Invalid service selected',
    },
    message: {
      required: 'Message is required',
      minLength: 'Message too short (min 10 chars)',
      maxLength: 'Message is too long (max 5000 characters)',
    },
  },
  ar: {
    name: {
      required: 'الاسم مطلوب',
      minLength: 'الاسم قصير جداً',
      maxLength: 'الاسم طويل جداً (100 حرف كحد أقصى)',
    },
    email: {
      required: 'البريد مطلوب',
      pattern: 'بريد إلكتروني غير صالح',
      maxLength: 'البريد طويل جداً',
    },
    service: {
      whitelist: 'الخدمة المختارة غير صالحة',
    },
    message: {
      required: 'الرسالة مطلوبة',
      minLength: 'الرسالة قصيرة جداً (10 أحرف على الأقل)',
      maxLength: 'الرسالة طويلة جداً (5000 حرف كحد أقصى)',
    },
  },
};

/**
 * Validate contact form data.
 * 
 * @param {Object} formData - The form data to validate
 * @param {string} lang - Current language ('en' | 'ar')
 * @returns {{ isValid: boolean, errors: Object }}
 */
export function validateContactForm(formData, lang = 'en') {
  const errors = {};
  const msgs = contactMessages[lang] || contactMessages.en;

  for (const [field, rules] of Object.entries(contactRules)) {
    const raw = formData[field] ?? '';

    // Whitelist check (for service field — no sanitize needed, just match)
    if (rules.whitelist) {
      if (!rules.whitelist.includes(raw)) {
        errors[field] = msgs[field].whitelist;
      }
      continue;
    }

    const value = sanitize(String(raw));

    if (rules.required && !value) {
      errors[field] = msgs[field].required;
    } else if (rules.minLength && value.length < rules.minLength) {
      errors[field] = msgs[field].minLength;
    } else if (rules.maxLength && value.length > rules.maxLength) {
      errors[field] = msgs[field].maxLength;
    } else if (rules.pattern && !rules.pattern.test(value)) {
      errors[field] = msgs[field].pattern;
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
