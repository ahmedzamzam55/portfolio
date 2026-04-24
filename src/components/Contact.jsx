/**
 * Contact Component — Thin Component (UI Only)
 * 
 * Security Features Rendered:
 *   - Honeypot invisible field (bot trap)
 *   - Error toast notification (real errors, not fake success)
 *   - Loading state on submit button
 *   - maxLength attributes on inputs
 *   - aria-label for accessibility
 *   - Email obfuscation (decoded at runtime, not visible to scrapers)
 *   - autocomplete="off" on honeypot, off on form to avoid caching
 *   - referrerpolicy="noopener" on external links
 */
import { useMemo } from 'react';
import { useApp } from '../hooks/useApp';
import { useContactForm } from '../hooks/useContactForm';

/**
 * Decode obfuscated contact info at runtime.
 * Bots parse static HTML — this runs only in the browser.
 * 
 * Obfuscation: reversed + base64-like split
 * zahmd8920@gmail.com  → stored reversed as "moc.liamg@0298dmhaz"
 */
function useContactInfo() {
  return useMemo(() => {
    const emailReversed = 'moc.liamg@0298dmhaz';
    const email = emailReversed.split('').reverse().join('');
    const phoneDisplay = '+966\u00A053\u00A0297\u00A01052'; // non-breaking spaces
    const phoneHref = '+966532971052';
    return { email, phoneDisplay, phoneHref };
  }, []);
}

export default function Contact() {
  const { t, lang } = useApp();
  const {
    form, errors, submitted, submitError, isSubmitting,
    honeypot, handleChange, handleHoneypotChange, handleSubmit,
  } = useContactForm(lang);

  const { email, phoneDisplay, phoneHref } = useContactInfo();

  return (
    <section className="section contact" id="contact">
      {/* Success Toast */}
      <div className={`toast-notification ${submitted ? 'visible' : ''}`}>
        <i className="fas fa-check-circle"></i>
        <div>
          <h4>{t.toast.successTitle}</h4>
          <p>{t.toast.successDesc}</p>
        </div>
      </div>

      {/* Error Toast */}
      <div className={`toast-notification toast-error ${submitError ? 'visible' : ''}`}>
        <i className="fas fa-exclamation-triangle"></i>
        <div>
          <h4>{t.toast.errorTitle}</h4>
          <p>{t.toast.errorDesc}</p>
        </div>
      </div>

      <div className="container">
        <h2 className="section-title">{t.contact.title}</h2>
        <div className="contact-grid">
          <div className="contact-info">
            {/* Email: decoded at runtime from reversed string — invisible to bots */}
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h4>{t.contact.email}</h4>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </div>

            {/* Phone: displayed with non-breaking spaces to confuse scrapers */}
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h4>{t.contact.phone}</h4>
                <a href={`tel:${phoneHref}`}>{phoneDisplay}</a>
              </div>
            </div>

            <div className="contact-item">
              <i className="fab fa-whatsapp"></i>
              <div>
                <h4>{t.contact.whatsapp}</h4>
                <a
                  href={`https://wa.me/${phoneHref}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                >
                  {t.contact.chatWith}
                </a>
              </div>
            </div>

            <div className="contact-item">
              <i className="fab fa-linkedin-in"></i>
              <div>
                <h4>LinkedIn</h4>
                <a
                  href="https://www.linkedin.com/in/ahmed-zamzam-7b9475233/"
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                >
                  Ahmed Zamzam
                </a>
              </div>
            </div>

            <div className="contact-item">
              <i className="fab fa-github"></i>
              <div>
                <h4>GitHub</h4>
                <a
                  href="https://github.com/ahmedzamzam55?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                >
                  ahmedzamzam55
                </a>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} autoComplete="off" noValidate>
            {/* Honeypot — invisible to humans, bots fill it out */}
            <input
              type="text"
              name="_gotcha"
              value={honeypot}
              onChange={handleHoneypotChange}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="form-group">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t.contact.namePh}
                className={errors.name ? 'error' : ''}
                maxLength={100}
                autoComplete="name"
                aria-label={t.contact.namePh}
                aria-required="true"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <span className="form-error" role="alert">
                  <i className="fas fa-exclamation-circle"></i> {errors.name}
                </span>
              )}
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t.contact.emailPh}
                className={errors.email ? 'error' : ''}
                maxLength={254}
                autoComplete="email"
                aria-label={t.contact.emailPh}
                aria-required="true"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <span className="form-error" role="alert">
                  <i className="fas fa-exclamation-circle"></i> {errors.email}
                </span>
              )}
            </div>

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              aria-label={t.contact.selectService}
            >
              <option value="">{t.contact.selectService}</option>
              <option value="basic">{t.contact.basic}</option>
              <option value="professional">{t.contact.professional}</option>
              <option value="enterprise">{t.contact.enterprise}</option>
              <option value="custom">{t.contact.custom}</option>
            </select>

            <div className="form-group">
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                placeholder={t.contact.messagePh}
                className={errors.message ? 'error' : ''}
                maxLength={5000}
                aria-label={t.contact.messagePh}
                aria-required="true"
                aria-invalid={!!errors.message}
              ></textarea>
              {errors.message && (
                <span className="form-error" role="alert">
                  <i className="fas fa-exclamation-circle"></i> {errors.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <><i className="fas fa-spinner fa-spin"></i> {t.contact.sending}</>
              ) : (
                <><i className="fas fa-paper-plane"></i> {t.contact.send}</>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
