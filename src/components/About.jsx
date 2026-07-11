import { useEffect, useRef } from 'react';
import { useApp } from '../hooks/useApp';

export default function About() {
  const { t } = useApp();
  const statsRef = useRef(null);
  const counted = useRef(false);

  const stats = [
    { target: 25, suffix: '+', label: t.about.projects },
    { target: 5, suffix: '+', label: t.about.years },
    { target: 10, suffix: '+', label: t.about.tech },
    { target: 100, suffix: '%', label: t.about.satisfaction },
  ];

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
          <div className="about-image animate-on-scroll"><img src="/img/1.webp" alt="Ahmed Zamzam" loading="lazy" /></div>
          <div className="about-text animate-on-scroll">
            <p>{t.about.desc}</p>
            <div className="about-stats" ref={statsRef}>
              {stats.map((s, i) => (
                <div className="stat" key={i}>
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
