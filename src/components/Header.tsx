import React from 'react';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-4xl mx-auto">
      <nav className="flex justify-center space-x-8 md:space-x-16 text-base text-gray-700">
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>Projects</NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink>
      </nav>
    </header>
  );
};

export default Header;