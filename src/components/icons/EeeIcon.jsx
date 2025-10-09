import React from 'react';

const EeeIcon = ({ color = 'currentColor', size = 24 }) => (
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
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 14v4" />
    <path d="M12 2a7 7 0 0 0-5.42 11.42L12 22l5.42-8.58A7 7 0 0 0 12 2z" />
  </svg>
);

export default EeeIcon;
