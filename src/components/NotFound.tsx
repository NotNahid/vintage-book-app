import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
      <h2 className="font-playfair text-3xl md:text-5xl mb-4 animate-fade-in-up">
        404 - Page Not Found
      </h2>
      <p className="text-base md:text-lg text-gray-700 mb-8 md:mb-10 animate-fade-in-up animation-delay-100">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-block px-8 py-3 rounded-full text-white font-semibold transition-transform duration-200 transform hover:scale-105 contact-form-button"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
