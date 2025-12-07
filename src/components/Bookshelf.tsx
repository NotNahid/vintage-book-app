import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Added Link import
import type { Project } from '../types';
import projectsData from '../projects.json';
import OpenBookModal from './OpenBookModal';
import StackedBooks from './StackedBooks';
import PottedPlant from './PottedPlant';
import Book from './Book';
import Lamp from './Lamp'; // Import the new Lamp component
import Notebook from './Notebook'; // Import new accessory
import Tablet from './Tablet';     // Import new accessory
import RolledPapers from './RolledPapers'; // Import new accessory
import ArtJar from './ArtJar';     // Import new accessory

interface BookshelfProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Bookshelf: React.FC<BookshelfProps> = ({ theme, toggleTheme }) => {
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
        <div className="flex items-end justify-center h-auto md:h-40 space-x-1 px-2 flex-wrap books-grid" style={{ flexWrap: 'wrap' }}>
            <div className="absolute left-0 bottom-0">
              <Notebook />
            </div>
            <div className="absolute left-16 bottom-0">
              <Tablet />
            </div>
            {topShelfProjects.map(renderBook)}
            <Link to="/gallery" state={{ fromPictureFrame: true }} className="picture-frame mx-auto my-4 md:mx-0 md:my-0 cursor-pointer">
              <div className="frame-inner"></div>
            </Link>
            <div className="absolute right-0 bottom-0">
              <Lamp theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>
          <div className="shelf w-full"></div>
        </div>

        {/* Bottom Shelf */}
        <div className="relative mt-12">
          <div className="flex items-end justify-center h-auto md:h-40 space-x-1 px-2 flex-wrap books-grid" style={{ flexWrap: 'wrap' }}>
            <div className="absolute left-0 bottom-0">
              <RolledPapers />
            </div>
            <div className="absolute left-20 bottom-0">
              <ArtJar />
            </div>
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