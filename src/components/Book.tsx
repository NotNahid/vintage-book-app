import React from 'react';
import type { Project } from '../projects';

interface BookProps {
  project: Project;
  onClick: () => void;
}

const Book: React.FC<BookProps> = ({ project, onClick }) => {
  return (
    <div
      key={project.id}
      onClick={onClick}
      className={`book cursor-pointer ${
        project.book.tilted === 'left' ? 'book-tilted-left' : ''
      } ${
        project.book.tilted === 'right' ? 'book-tilted-right' : ''
      }`}
      style={{
        width: project.book.width,
        height: project.book.height,
        backgroundColor: project.book.color,
      }}
    >
      <span className="book-hover-label">{project.title}</span>
      {project.book.special === 'band-1' && (
        <div className="absolute top-1/4 left-0 w-full h-4 bg-[#5C839A]"></div>
      )}
      {project.book.special === 'band-2' && (
        <div className="absolute top-1/3 left-0 w-full h-6 bg-[#E8B85A]"></div>
      )}
    </div>
  );
};

export default Book;
