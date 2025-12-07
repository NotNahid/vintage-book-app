import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Effect for handling scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Effect for closing menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-base transition-colors duration-300 ${isActive ? 'font-semibold text-black dark:text-white' : 'font-normal text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white'}`;
  
  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-3xl font-light transition-colors duration-300 ${isActive ? 'font-semibold text-white' : 'text-gray-300 hover:text-white'}`;

  return (
    <>
      {/* --- Header Bar for Desktop & Mobile --- */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'shadow-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm' : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <NavLink to="/" className="text-xl font-bold text-gray-800 dark:text-white">
            Nahid
          </NavLink>

          {/* --- Desktop Navigation --- */}
          <nav className="hidden md:flex items-center space-x-10">
            <NavLink to="/about" className={navLinkClasses}>About</NavLink>
            <NavLink to="/" end className={navLinkClasses}>Projects</NavLink>
            <NavLink to="/gallery" className={navLinkClasses}>Gallery</NavLink>
            <NavLink to="/contact" className={navLinkClasses}>Contact</NavLink>
          </nav>

          {/* --- Mobile Hamburger Button --- */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="z-50 relative w-7 h-7 flex flex-col justify-center items-center text-gray-800 dark:text-white focus:outline-none">
              <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
              <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block absolute h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* --- Mobile Menu Overlay --- */}
      <div className={`fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-sm flex flex-col items-center justify-center transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'transform-none' : '-translate-y-full'}`}>
        <nav className="flex flex-col items-center text-center space-y-8">
          <NavLink to="/about" className={mobileNavLinkClasses}>About</NavLink>
          <NavLink to="/" end className={mobileNavLinkClasses}>Projects</NavLink>
          <NavLink to="/gallery" className={mobileNavLinkClasses}>Gallery</NavLink>
          <NavLink to="/contact" className={mobileNavLinkClasses}>Contact</NavLink>
        </nav>
      </div>
    </>
  );
};

export default Header;