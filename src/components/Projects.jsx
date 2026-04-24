/**
 * Projects Component — Thin Component (UI Only)
 * 
 * Single Responsibility: ONLY renders the projects grid UI.
 * All filtering logic has been extracted to:
 *   - useProjects hook (Service Layer)
 *   - ProjectRepository (Data Access Layer)
 */
import { useApp } from '../hooks/useApp';
import { useProjects } from '../hooks/useProjects';

export default function Projects() {
  const { t } = useApp();
  const { filter, setFilter, categories, categoryLabels, projects, gridRef } = useProjects(t);

  return (
    <section className="section projects" id="projects">
      <div className="container">
        <h2 className="section-title">{t.projects.title}</h2>
        <div className="project-filters">
          {categories.map(c => (
            <button key={c} className={`filter-btn${filter === c ? ' active' : ''}`} onClick={() => setFilter(c)}>{categoryLabels[c]}</button>
          ))}
        </div>
        <div className="projects-grid" ref={gridRef}>
          {projects.map((p) => (
            <div className="project-card animate-on-scroll" key={p.name}>
              <div className="project-img">
                <img src={p.img} alt={p.name} loading="lazy" />
                <div className="project-overlay">
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm"><i className="fas fa-external-link-alt"></i> {t.projects.liveDemo}</a>
                </div>
              </div>
              <div className="project-info">
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className="project-tags">{p.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
