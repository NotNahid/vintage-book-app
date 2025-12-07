import React from 'react';

const Tablet: React.FC = () => {
  return (
    <div className="relative w-20 h-24 flex items-end justify-center mx-2">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Tablet body */}
        <rect x="10" y="5" width="80" height="90" fill="#4A4A4A" rx="10" />
        {/* Screen */}
        <rect x="15" y="10" width="70" height="80" fill="#1E1E1E" rx="5" />
        {/* Stylus */}
        <rect x="85" y="20" width="5" height="60" fill="#A0A0A0" rx="2.5" />
        {/* Simple icon on screen */}
        <path d="M 30 50 L 45 35 L 60 50 L 75 35" stroke="#00BFFF" strokeWidth="4" fill="none" />
      </svg>
    </div>
  );
};

export default Tablet;
