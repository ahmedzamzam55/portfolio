import { useApp } from '../hooks/useApp';

export default function CTA() {
  const { t } = useApp();

  const handleScroll = (e) => {
    e.preventDefault();
    const target = document.querySelector('#contact');
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="cta-banner-section">
      <div className="container">
        <div className="cta-banner-content animate-on-scroll">
          <div className="cta-banner-text">
            <h2>{t.cta.title}</h2>
            <p>{t.cta.subtitle}</p>
          </div>
          <div className="cta-banner-action">
            <a href="#contact" onClick={handleScroll} className="btn btn-primary btn-cta">
              <i className="fas fa-comments"></i> {t.cta.button}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
