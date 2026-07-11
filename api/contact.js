/**
 * Vercel Serverless Function — /api/contact
 * 
 * Handles contact form submissions server-side.
 * Security Features:
 *   - Server-side validation (no client trust)
 *   - Rate limiting by IP (in-memory, per-instance)
 *   - Cloudflare Turnstile verification (when configured)
 *   - Email and API keys read from environment variables
 *   - Input sanitization
 */

// ── Rate Limiting (in-memory per serverless instance) ──
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const RATE_LIMIT_MAX = 3; // max 3 requests per minute per IP

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

// ── Sanitization ──
function sanitize(input) {
  if (typeof input !== 'string') return '';
  let sanitized = input;
  let prev;
  do {
    prev = sanitized;
    sanitized = sanitized
      .replace(/<[^>]*>/g, '')
      .replace(/javascript\s*:/gi, '')
      .replace(/vbscript\s*:/gi, '')
      .replace(/data\s*:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  } while (sanitized !== prev);
  return sanitized.trim();
}

// ── Validation ──
const ALLOWED_SERVICES = ['', 'basic', 'professional', 'enterprise', 'custom'];
const SERVICE_LABELS = {
  basic: 'Basic Package',
  professional: 'Professional Package',
  enterprise: 'Enterprise Package',
  custom: 'Custom Project',
  '': 'Not specified',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(data) {
  const errors = [];

  if (!data.name || sanitize(data.name).length < 2) {
    errors.push('Name is required (min 2 characters)');
  }
  if (sanitize(data.name || '').length > 100) {
    errors.push('Name is too long (max 100 characters)');
  }
  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    errors.push('Valid email is required');
  }
  if ((data.email || '').length > 254) {
    errors.push('Email is too long');
  }
  if (data.service && !ALLOWED_SERVICES.includes(data.service)) {
    errors.push('Invalid service selected');
  }
  if (!data.message || sanitize(data.message).length < 10) {
    errors.push('Message is required (min 10 characters)');
  }
  if (sanitize(data.message || '').length > 5000) {
    errors.push('Message is too long (max 5000 characters)');
  }

  return errors;
}

// ── Turnstile Verification ──
async function verifyTurnstile(token) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // If no secret is configured, skip verification (development mode)
    console.warn('TURNSTILE_SECRET_KEY not set — skipping verification');
    return true;
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, response: token }),
  });

  const result = await response.json();
  return result.success === true;
}

// ── Main Handler ──
export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limit by IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
  }

  try {
    const { name, email, service, message, turnstileToken } = req.body;

    // Verify Turnstile
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return res.status(400).json({ error: 'Security verification required' });
      }
      const isHuman = await verifyTurnstile(turnstileToken);
      if (!isHuman) {
        return res.status(403).json({ error: 'Security verification failed' });
      }
    }

    // Validate
    const validationErrors = validateForm({ name, email, service, message });
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: 'Validation failed', details: validationErrors });
    }

    // Sanitize
    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanMessage = sanitize(message);
    const cleanService = ALLOWED_SERVICES.includes(service) ? SERVICE_LABELS[service] : SERVICE_LABELS[''];

    // Send to FormSubmit
    const formsubmitEmail = process.env.FORMSUBMIT_EMAIL || 'zahmd8920@gmail.com';
    const apiUrl = `https://formsubmit.co/ajax/${formsubmitEmail}`;

    const response = await fetch(apiUrl, {
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
      throw new Error(`FormSubmit returned HTTP ${response.status}`);
    }

    const data = await response.json();
    return res.status(200).json({ success: true, data });

  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
