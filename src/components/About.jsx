import { useEffect, useRef } from 'react';
import { useApp } from '../hooks/useApp';

export default function About() {
  const { t } = useApp();
  const statsRef = useRef(null);
  const counted = useRef(false);

  const stats = [
    { target: 25, suffix: '+', label: t.about.projects, icon: 'fa-folder-open' },
    { target: 5, suffix: '+', label: t.about.years, icon: 'fa-clock' },
    { target: 10, suffix: '+', label: t.about.tech, icon: 'fa-cogs' },
    { target: 100, suffix: '%', label: t.about.satisfaction, icon: 'fa-star' },
  ];

  const techBadges = ['React.js', 'Laravel', 'Node.js', 'MySQL', 'Vue.js', 'Docker'];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !counted.current) {
        counted.current = true;
        statsRef.current.querySelectorAll('.stat-num').forEach(el => {
          const target = +el.dataset.target;
          let current = 0;
          const step = target / 125;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) { el.textContent = target; clearInterval(timer); }
            else el.textContent = Math.floor(current);
          }, 16);
        });
      }
    }, { threshold: 0.5 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section about" id="about">
      <div className="container">
        <h2 className="section-title">{t.about.title}</h2>
        <div className="about-grid">
          <div className="about-image animate-on-scroll"><img src="/img/profile.webp" alt="Ahmed Zamzam" loading="lazy" /></div>
          <div className="about-text animate-on-scroll">
            <p>{t.about.desc}</p>
            <div className="about-cta-row">
              <a href="#projects" className="btn btn-primary btn-sm"><i className="fas fa-laptop-code"></i> {t.about.viewProjects}</a>
              <a href="#contact" className="btn btn-outline btn-sm"><i className="fas fa-comments"></i> {t.about.letsTalk}</a>
            </div>
            <div className="about-tech-badges">
              {techBadges.map(tech => (
                <span key={tech}><i className="fas fa-check-circle"></i> {tech}</span>
              ))}
            </div>
            <div className="about-stats" ref={statsRef}>
              {stats.map((s, i) => (
                <div className="stat" key={i}>
                  <i className={`fas ${s.icon} stat-icon`}></i>
                  <span className="stat-num" data-target={s.target}>0</span>{s.suffix}
                  <p>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
