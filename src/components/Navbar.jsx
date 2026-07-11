import { useState, useEffect } from 'react';
import { useApp } from '../hooks/useApp';

export default function Navbar() {
  const { t, theme, lang, toggleTheme, toggleLang } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#hero', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#skills', label: t.nav.skills },
    { href: '#projects', label: t.nav.projects },
    { href: '#pricing', label: t.nav.pricing },
    { href: '#testimonials', label: t.nav.testimonials },
    { href: '#contact', label: t.nav.contact },
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 70; // 70px nav height offset
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#hero" className="nav-logo" onClick={(e) => handleScroll(e, '#hero')}>
          <img 
            src={theme === 'dark' ? '/logo_dark.png' : '/logo_light.png'} 
            alt="Ahmed Zamzam Logo" 
            className="nav-logo-img" 
          />
        </a>
        <ul className={`nav-links${menuOpen ? ' active' : ''}`}>
          {links.map(l => (
            <li key={l.href}><a href={l.href} onClick={(e) => handleScroll(e, l.href)}>{l.label}</a></li>
          ))}
        </ul>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`}></i>
          </button>
          <button className="lang-toggle" onClick={toggleLang}>{lang === 'en' ? 'AR' : 'EN'}</button>
          <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`fas fa-${menuOpen ? 'times' : 'bars'}`}></i>
          </button>
        </div>
      </div>
    </nav>
  );
}
