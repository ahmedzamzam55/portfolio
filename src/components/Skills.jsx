/**
 * Skills Component — Thin Component (UI Only)
 * 
 * Single Responsibility: ONLY renders the skills grid UI.
 * Data has been extracted to data/skills.js (Data Layer).
 * Open/Closed: Add new skills in the data file without touching this component.
 */
import { useApp } from '../hooks/useApp';
import { skillsData } from '../data/skills';

export default function Skills() {
  const { t } = useApp();
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <h2 className="section-title">{t.skills.title}</h2>
        <div className="skills-grid">
          {skillsData.map((s, i) => (
            <div className="skill-card animate-on-scroll" key={i}>
              <h3><i className={`fas ${s.icon}`}></i> {t.skills[s.key]}</h3>
              <div className="skill-tags">{s.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
