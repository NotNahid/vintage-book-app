import React from 'react';

const TextileIcon = ({ color = 'currentColor', size = 24 }) => (
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
    <path d="M12 5v14" />
    <path d="M18 5v14" />
    <path d="M6 5v14" />
  </svg>
);

export default TextileIcon;
