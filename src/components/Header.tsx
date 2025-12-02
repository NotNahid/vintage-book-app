import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-4xl mx-auto">
      <nav className="flex justify-center space-x-8 md:space-x-16 text-base text-gray-700">
        <Link to="/about" className="hover:text-black transition-colors">About</Link>
        <Link to="/" className="hover:text-black transition-colors">Projects</Link>
        <Link to="/contact" className="hover:text-black transition-colors">Contact</Link>
      </nav>
    </header>
  );
};

export default Header;