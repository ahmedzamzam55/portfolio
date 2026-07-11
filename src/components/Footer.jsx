import { useApp } from '../hooks/useApp';

export default function Footer() {
  const { t, theme } = useApp();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="#hero" className="nav-logo">
              <img 
                src={theme === 'dark' ? '/logo_dark.png' : '/logo_light.png'} 
                alt="Ahmed Zamzam Logo" 
                className="nav-logo-img" 
              />
            </a>
            <p>{t.footer.role}</p>
          </div>
          <div className="footer-links">
            <a href="#about">{t.nav.about}</a>
            <a href="#projects">{t.nav.projects}</a>
            <a href="#pricing">{t.nav.pricing}</a>
            <a href="#contact">{t.nav.contact}</a>
          </div>
          <div className="footer-socials">
            <a href="https://github.com/ahmedzamzam55?tab=repositories" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fab fa-github"></i></a>
            <a href="https://www.linkedin.com/in/ahmed-zamzam-7b9475233/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a href="https://wa.me/966532971052" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
            <a href="mailto:zahmd8920@gmail.com" aria-label="Email"><i className="fas fa-envelope"></i></a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Ahmed Zamzam. {t.footer.rights}</p>
          <p>{t.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
