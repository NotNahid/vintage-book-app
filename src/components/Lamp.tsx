import React from 'react';

interface LampProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Lamp: React.FC<LampProps> = ({ theme, toggleTheme }) => {
  const isDark = theme === 'dark';

  return (
    <div
      className="relative w-24 h-24 cursor-pointer group"
      onClick={toggleTheme}
      title="Toggle Dark Mode"
    >
      {/* Lamp SVG */}
      <svg
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20"
      >
        {/* Base */}
        <circle cx="50" cy="95" r="8" fill="#A0522D" /> {/* Light brown/beige */}

        {/* Jointed Arm */}
        <path
          d="M 50 95 Q 40 70 60 40 L 65 35 Q 70 30 75 35 L 70 40 Q 50 70 50 95 Z"
          fill="#A0522D" // Light brown/beige
          stroke="#8B4513" // Darker brown for definition
          strokeWidth="2"
        />

        {/* Shade */}
        <path
          d="M 60 35 L 80 20 L 75 15 L 55 30 Z"
          fill="#A0522D" // Light brown/beige
          stroke="#8B4513" // Darker brown for definition
          strokeWidth="2"
        />

        {/* Glow (only visible in dark mode) */}
        {isDark && (
          <path
            d="M 60 35 L 80 20 L 75 15 L 55 30 Z"
            fill="url(#yellowGlow)"
            filter="url(#glowFilter)"
          />
        )}

        <defs>
          <radialGradient id="yellowGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 0, 0.8)" />
            <stop offset="100%" stopColor="rgba(255, 255, 0, 0)" />
          </radialGradient>
          <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Lamp;
