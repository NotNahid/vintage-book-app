import React from 'react';

const ChemistryIcon = ({ color = 'currentColor', size = 24 }) => (
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
    <path d="M5.5 22h13" />
    <path d="M5.5 22V12" />
    <path d="M18.5 22V12" />
    <path d="M5.5 12h13" />
    <path d="M9 12V6a3 3 0 0 1 3-3h0a3 3 0 0 1 3 3v6" />
  </svg>
);

export default ChemistryIcon;
