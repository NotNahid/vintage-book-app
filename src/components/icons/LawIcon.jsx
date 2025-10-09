import React from 'react';

const LawIcon = ({ color = 'currentColor', size = 24 }) => (
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
    <path d="M16 16.5l4-4L16.5 9" />
    <path d="M9.5 12H20" />
    <path d="M8 16.5l-4-4L7.5 9" />
    <path d="M4.5 12H15" />
    <path d="M12 2v2.5" />
    <path d="M12 19.5V22" />
    <path d="M12 4.5a2.5 2.5 0 0 1-2.5 2.5h-1a2.5 2.5 0 0 1-2.5-2.5V4.5" />
    <path d="M12 4.5a2.5 2.5 0 0 0 2.5 2.5h1a2.5 2.5 0 0 0 2.5-2.5V4.5" />
  </svg>
);

export default LawIcon;
