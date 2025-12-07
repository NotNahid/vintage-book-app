import React from 'react';

const Notebook: React.FC = () => {
  return (
    <div className="relative w-16 h-20 flex items-end justify-center mx-2">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Cover */}
        <rect x="20" y="10" width="70" height="85" fill="#D2B48C" rx="5" />
        {/* Pages */}
        <rect x="25" y="10" width="65" height="85" fill="#F5F5F5" rx="5" />
        {/* Spiral Binding */}
        <path d="M 22 15 L 22 80" stroke="#8B4513" strokeWidth="4" fill="none" />
        <circle cx="22" cy="20" r="3" fill="#8B4513" />
        <circle cx="22" cy="30" r="3" fill="#8B4513" />
        <circle cx="22" cy="40" r="3" fill="#8B4513" />
        <circle cx="22" cy="50" r="3" fill="#8B4513" />
        <circle cx="22" cy="60" r="3" fill="#8B4513" />
        <circle cx="22" cy="70" r="3" fill="#8B4513" />
      </svg>
    </div>
  );
};

export default Notebook;
