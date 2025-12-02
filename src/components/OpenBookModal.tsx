import React, { useState, useEffect } from 'react';
import type { Project } from '../projects';

interface OpenBookModalProps {
  project: Project;
  onClose: () => void;
}

const OpenBookModal: React.FC<OpenBookModalProps> = ({ project, onClose }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsActive(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsActive(false);
    setTimeout(onClose, 1000); // Wait for animation to finish
  };

  return (
    <div className={`book-modal-overlay ${isActive ? 'active' : ''}`} onClick={handleClose}>
      <div className="book-container-3d">
        <div className="book-model" onClick={(e) => e.stopPropagation()}>
          {/* Left Page */}
          <div className="book-page book-page-left">
            {project.image && <img src={project.image} alt={project.title} />}
            <h2>{project.title}</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
          </div>

          {/* Right Page */}
          <div className="book-page">
            <div className="description">
              <p>{project.description}</p>
            </div>
            {(project.liveUrl || project.sourceUrl) && (
              <div className="modal-actions">
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="modal-action-btn btn-primary">
                    View Live Site
                  </a>
                )}
                {project.sourceUrl && (
                  <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="modal-action-btn btn-secondary">
                    View Source Code
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Cover */}
          <div className="book-cover" style={{ backgroundColor: project.book.color }}></div>
        </div>
      </div>
    </div>
  );
};

export default OpenBookModal;
