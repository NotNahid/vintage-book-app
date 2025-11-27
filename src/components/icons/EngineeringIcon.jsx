import React from 'react';

const EngineeringIcon = ({ size = 24, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"></path>
    <path d="M12 14a7 7 0 0 0-7 7h14a7 7 0 0 0-7-7z"></path>
    <path d="M12 1v2"></path>
    <path d="m4.93 4.93 1.41 1.41"></path>
    <path d="M2 12h2"></path>
    <path d="m4.93 19.07 1.41-1.41"></path>
    <path d="M12 21v2"></path>
    <path d="m19.07 19.07-1.41-1.41"></path>
    <path d="M22 12h-2"></path>
    <path d="m19.07 4.93-1.41 1.41"></path>
  </svg>
);

export default EngineeringIcon;
