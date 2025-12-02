import React, { useState, useEffect } from 'react';
import type { Project } from '../types';
import projectsData from '../projects.json';
import OpenBookModal from './OpenBookModal';
import StackedBooks from './StackedBooks';
import PottedPlant from './PottedPlant';
import Book from './Book';

const Bookshelf: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(projectsData);
  }, []);

  const topShelfProjects = projects.slice(0, 21);
  const bottomShelfProjects = projects.slice(21, 36);

  const renderBook = (project: Project) => (
    <Book project={project} onClick={() => setSelectedProject(project)} />
  );

  return (
    <main className="flex-grow flex flex-col items-center justify-center text-center mt-12 md:mt-16 bookshelf-container">


      {/* Bookshelf Section */}
      <div className="relative w-full max-w-4xl bookshelf-shadow">
    {/* Top Shelf */}
    <div className="relative">
        <div className="flex items-end justify-center h-auto md:h-40 space-x-1 px-2 flex-wrap books-grid">
            {topShelfProjects.map(renderBook)}
            <div className="picture-frame mx-auto my-4 md:mx-0 md:my-0">
              <div className="frame-inner"></div>
            </div>
          </div>
          <div className="shelf w-full"></div>
        </div>

        {/* Bottom Shelf */}
        <div className="relative mt-12">
          <div className="flex items-end justify-center h-auto md:h-40 space-x-1 px-2 flex-wrap books-grid">
            {bottomShelfProjects.map(renderBook)}
            
            <StackedBooks />
            
            <PottedPlant />
          </div>
          <div className="shelf w-full"></div>
        </div>
      </div>

      {selectedProject && (
        <OpenBookModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </main>
  );
};

export default Bookshelf;