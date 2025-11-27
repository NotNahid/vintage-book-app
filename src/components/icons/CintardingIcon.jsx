import React from 'react';

const CintardingIcon = ({ size = 24, color = 'currentColor' }) => (
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
    <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6c-1 .9-2.6.9-3.5 0l-8.6-8.6c-.9-1-.9-2.6 0-3.5l2.6-2.6a2.4 2.4 0 0 1 3.4 0l8.6 8.6z"></path>
    <path d="m7.5 10.5 2 2"></path>
    <path d="m10.5 7.5 2 2"></path>
    <path d="m13.5 4.5 2 2"></path>
    <path d="M5 15v2h2"></path>
  </svg>
);

export default CintardingIcon;
