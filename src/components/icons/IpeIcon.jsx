import React from 'react';

const IpeIcon = ({ color = 'currentColor', size = 24 }) => (
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
    <path d="M2 22h20" />
    <path d="M4 18V8h4v10" />
    <path d="M8 18V8h4v10" />
    <path d="M12 18V8h4v10" />
    <path d="M16 18V8h4v10" />
    <path d="M2 8h20" />
    <path d="M12 4l4 4" />
    <path d="M12 4l-4 4" />
  </svg>
);

export default IpeIcon;
