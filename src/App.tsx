import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useFavicon } from './hooks/useFavicon';
import usePageTitle from './hooks/usePageTitle';
import BookIcon from './assets/icons/BookIcon.svg';
import FeatherIcon from './assets/icons/FeatherIcon.svg';
import ContactIcon from './assets/icons/ContactIcon.svg';
import './App.css';
import projectsData from './projects.json';

const Bookshelf = lazy(() => import('./components/Bookshelf'));
const About = lazy(() => import('./components/About'));
const Contact = lazy(() => import('./components/Contact'));
const Gallery = lazy(() => import('./components/Gallery'));
const ThankYou = lazy(() => import('./components/ThankYou'));
const NotFound = lazy(() => import('./components/NotFound'));

const App: React.FC = () => {
  const location = useLocation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  usePageTitle();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  let favicon = BookIcon;
  if (location.pathname === '/about') {
    favicon = FeatherIcon;
  } else if (location.pathname === '/contact') {
    favicon = ContactIcon;
  }
  useFavicon(favicon);

  const isGallery = location.pathname === '/gallery';

  const galleryItems = projectsData.map(project => ({
    image: project.image || 'https://picsum.photos/900/900?grayscale', // Fallback image
    title: project.title,
    description: project.description,
    link: project.sourceUrl || '#' // Fallback link
  }));

  return (
    <div className={`flex flex-col items-center min-h-screen bg-[#F7F7F7] dark:bg-gray-800 text-gray-800 dark:text-gray-300 transition-colors duration-300 ${!isGallery ? 'pt-24 md:pt-32 px-4' : ''}`}>
      {!isGallery && <Header />}
      <Suspense fallback={<div className="flex-grow text-center p-8">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Bookshelf theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery items={galleryItems} />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!isGallery && <Footer />}
    </div>
  );
};

export default App;
