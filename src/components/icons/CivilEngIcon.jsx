import React from 'react';

const CivilEngIcon = ({ color = 'currentColor', size = 24 }) => (
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
    <path d="M4 22h16" />
    <path d="M6 18V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 6h4" />
    <path d="M10 18h4" />
  </svg>
);

export default CivilEngIcon;
