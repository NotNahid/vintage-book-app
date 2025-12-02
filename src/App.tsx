import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Bookshelf from './components/Bookshelf';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import { useFavicon } from './hooks/useFavicon';
import BookIcon from './assets/icons/BookIcon.svg?react';
import FeatherIcon from './assets/icons/FeatherIcon.svg?react';
import ContactIcon from './assets/icons/ContactIcon.svg?react';
import './App.css';

const App: React.FC = () => {
  const location = useLocation();
  let favicon = BookIcon;
  if (location.pathname === '/about') {
    favicon = FeatherIcon;
  } else if (location.pathname === '/contact') {
    favicon = ContactIcon;
  }
  useFavicon(favicon);

  return (
    <div className="flex flex-col items-center min-h-screen pt-12 md:pt-20 px-4">
      <Header />
      <Routes>
        <Route path="/" element={<Bookshelf />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
