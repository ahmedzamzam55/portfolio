/**
 * Projects Component — Thin Component (UI Only)
 * 
 * Single Responsibility: ONLY renders the projects grid UI.
 * All filtering logic has been extracted to:
 *   - useProjects hook (Service Layer)
 *   - ProjectRepository (Data Access Layer)
 */
import { useState, useEffect, useRef } from 'react';
import { useApp } from '../hooks/useApp';
import { useProjects } from '../hooks/useProjects';

export default function Projects() {
  const { t } = useApp();
  const { filter, setFilter, categories, categoryLabels, projects, gridRef } = useProjects(t);
  const [activeVideo, setActiveVideo] = useState(null);
  const modalRef = useRef(null);

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

  // Focus trap effect for modal accessibility
  useEffect(() => {
    if (!activeVideo || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableSelector = 'button, iframe, video, [tabindex="0"]';
    const focusableElements = modal.querySelectorAll(focusableSelector);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (firstElement) {
      // Small timeout to let rendering finish
      setTimeout(() => firstElement.focus(), 50);
    }

    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    modal.addEventListener('keydown', handleKeyDown);
    return () => {
      modal.removeEventListener('keydown', handleKeyDown);
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
        <div className="project-filters" role="group" aria-label="Filter projects">
          {categories.map(c => (
            <button 
              key={c} 
              className={`filter-btn${filter === c ? ' active' : ''}`} 
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
            >
              {categoryLabels[c]}
            </button>
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
                    <span className="project-cat-badge">{categoryLabels[p.cat] || p.cat}</span>
                    <div className="project-overlay" onClick={() => handlePreview(p)}>
                      <button className="btn btn-sm">
                        <i className="fas fa-play-circle"></i> {t.projects.watchVideo}
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <img src={p.img} alt={p.name} loading="lazy" />
                    <span className="project-cat-badge">{categoryLabels[p.cat] || p.cat}</span>
                    <div className="project-overlay">
                      <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn btn-sm"><i className="fas fa-external-link-alt"></i> {t.projects.liveDemo}</a>
                    </div>
                  </>
                )}
              </div>

              <div className="project-info">
                <h3>{p.name}</h3>
                <p className="project-desc">{p.desc}</p>
                {p.caseStudy && (
                  <div className="project-case-study">
                    <div className="case-study-item">
                      <span className="case-study-label">{t.projects.problem}:</span>
                      <span className="case-study-value">{p.caseStudy.problem}</span>
                    </div>
                    <div className="case-study-item">
                      <span className="case-study-label">{t.projects.solution}:</span>
                      <span className="case-study-value">{p.caseStudy.solution}</span>
                    </div>
                    <div className="case-study-item">
                      <span className="case-study-label">{t.projects.result}:</span>
                      <span className="case-study-value">{p.caseStudy.result}</span>
                    </div>
                  </div>
                )}
                <div className="project-tags">{p.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div 
          className="video-modal" 
          onClick={() => setActiveVideo(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          ref={modalRef}
        >
          <button 
            className="video-modal-close-float" 
            onClick={() => setActiveVideo(null)}
            aria-label="Close video player"
          >
            <i className="fas fa-times"></i>
          </button>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="video-modal-header">
              <span className="video-modal-title" id="video-modal-title">
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
                sandbox="allow-scripts allow-same-origin"
                referrerPolicy="no-referrer"
                title={`${activeVideo.name} video preview`}
              ></iframe>
            ) : (
              <video
                src={activeVideo.video}
                controls
                autoPlay
                playsInline
                className="video-modal-player"
                title={`${activeVideo.name} video preview`}
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}
