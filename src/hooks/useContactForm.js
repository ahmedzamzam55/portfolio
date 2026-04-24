/**
 * useContactForm Hook
 * 
 * Service Layer — Contains ALL contact form business logic.
 * 
 * Security Features:
 *   - Rate limiting (60-second cooldown after submit)
 *   - Honeypot field (invisible trap for bots)
 *   - Proper error handling (no fake success)
 *   - Input sanitization via validation layer
 * 
 * Dependency Inversion: 
 *   - Uses contactValidation for validation (FormRequest equivalent)
 *   - Uses ContactRepository for API calls (Repository Pattern)
 */
import { useState, useRef, useCallback } from 'react';
import { validateContactForm } from '../validations/contactValidation';
import ContactRepository from '../repositories/ContactRepository';

const INITIAL_FORM = { name: '', email: '', service: '', message: '' };
const COOLDOWN_MS = 60000; // 60-second cooldown between submissions

export function useContactForm(lang) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // Bot trap
  const lastSubmitTime = useRef(0);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear field error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleHoneypotChange = useCallback((e) => {
    setHoneypot(e.target.value);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    // ── Security Check 1: Honeypot ──
    // If honeypot field has value, it's a bot — silently reject
    if (honeypot) {
      setSubmitted(true);
      setForm(INITIAL_FORM);
      setTimeout(() => setSubmitted(false), 5000);
      return; // Silently ignore bot submission
    }

    // ── Security Check 2: Rate Limiting ──
    const now = Date.now();
    if (now - lastSubmitTime.current < COOLDOWN_MS) {
      const remaining = Math.ceil((COOLDOWN_MS - (now - lastSubmitTime.current)) / 1000);
      setErrors({ 
        message: lang === 'ar' 
          ? `يرجى الانتظار ${remaining} ثانية قبل الإرسال مرة أخرى`
          : `Please wait ${remaining} seconds before sending again`
      });
      return;
    }

    // ── Validation ──
    const { isValid, errors: validationErrors } = validateContactForm(form, lang);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    // ── Submission ──
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      await ContactRepository.submit(form);
      lastSubmitTime.current = Date.now();
      setSubmitted(true);
      setForm(INITIAL_FORM);
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Contact submission error:', error);
      // Show REAL error — don't fake success
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  }, [form, honeypot, lang]);

  const resetForm = useCallback(() => {
    setForm(INITIAL_FORM);
    setErrors({});
    setSubmitted(false);
    setSubmitError(false);
    setHoneypot('');
  }, []);

  return {
    form,
    errors,
    submitted,
    submitError,
    isSubmitting,
    honeypot,
    handleChange,
    handleHoneypotChange,
    handleSubmit,
    resetForm,
  };
}
