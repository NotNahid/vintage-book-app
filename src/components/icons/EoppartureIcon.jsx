import React from 'react';

const EoppartureIcon = ({ size = 24, color = 'currentColor' }) => (
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
    <circle cx="12" cy="12" r="10"></circle>
    <path d="m12 18-3.4-3.4"></path>
    <path d="m12 6 3.4 3.4"></path>
    <path d="M12 12l-7 4"></path>
    <path d="M12 12l7 4"></path>
  </svg>
);

export default EoppartureIcon;
