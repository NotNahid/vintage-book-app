import React from 'react';

const FlaskIcon = ({ size = 24, color = 'currentColor' }) => (
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
    <path d="M14.5 4h-5L6 22h12L14.5 4z"></path>
    <path d="M8.5 4h7"></path>
  </svg>
);

export default FlaskIcon;
