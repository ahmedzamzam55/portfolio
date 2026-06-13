/**
 * Projects Component — Thin Component (UI Only)
 * 
 * Single Responsibility: ONLY renders the projects grid UI.
 * All filtering logic has been extracted to:
 *   - useProjects hook (Service Layer)
 *   - ProjectRepository (Data Access Layer)
 */
import { useState, useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import { useProjects } from '../hooks/useProjects';

export default function Projects() {
  const { t } = useApp();
  const { filter, setFilter, categories, categoryLabels, projects, gridRef } = useProjects(t);
  const [activeVideo, setActiveVideo] = useState(null);

  // Close video on Escape key or outside click
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setActiveVideo(null);
    };
    window.addEventListener('keydown', handleEsc);
    // Prevent scrolling on body when modal is open
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [activeVideo]);

  const handlePreview = (project) => {
    if (project.video) {
      setActiveVideo(project);
    }
  };

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
            <div className={`project-card animate-on-scroll`} key={p.name}>
              <div className="project-img">
                {p.video ? (
                  <>
                    <div className="video-placeholder-bg" onClick={() => handlePreview(p)}>
                      {p.img ? (
                        <img src={p.img} alt={p.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <i className="fas fa-video video-icon-large"></i>
                      )}
                      <div className="video-play-badge">
                        <i className="fas fa-play"></i>
                      </div>
                    </div>
                    <div className="project-overlay" onClick={() => handlePreview(p)}>
                      <button className="btn btn-sm">
                        <i className="fas fa-play-circle"></i> {t.projects.watchVideo}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <img src={p.img} alt={p.name} loading="lazy" />
                    <div className="project-overlay">
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm"><i className="fas fa-external-link-alt"></i> {t.projects.liveDemo}</a>
                    </div>
                  </>
                )}
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

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="video-modal" onClick={() => setActiveVideo(null)}>
          <button className="video-modal-close-float" onClick={() => setActiveVideo(null)}>
            <i className="fas fa-times"></i>
          </button>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <span className="video-modal-title">
                <i className="fas fa-play-circle"></i> {activeVideo.name}
              </span>
            </div>
            {activeVideo.video.includes('drive.google.com') ? (
              <iframe
                src={activeVideo.video}
                width="100%"
                height="500"
                allow="autoplay"
                className="video-modal-player"
                style={{ border: 'none' }}
                allowFullScreen
              ></iframe>
            ) : (
              <video
                src={activeVideo.video}
                controls
                autoPlay
                playsInline
                className="video-modal-player"
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
