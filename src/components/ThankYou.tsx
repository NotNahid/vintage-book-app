import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
      <h2 className="font-playfair text-3xl md:text-5xl mb-4 animate-fade-in-up">
        Thank You!
      </h2>
      <p className="text-base md:text-lg text-gray-700 mb-8 md:mb-10 animate-fade-in-up animation-delay-100">
        Your message has been sent successfully. I'll get back to you as soon as possible.
      </p>
      <Link
        to="/"
        className="inline-block px-8 py-3 rounded-full text-white font-semibold transition-transform duration-200 transform hover:scale-105 contact-form-button"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default ThankYou;
