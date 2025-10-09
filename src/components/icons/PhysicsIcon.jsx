import React from 'react';

const PhysicsIcon = ({ color = 'currentColor', size = 24 }) => (
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
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <ellipse cx="12" cy="19" rx="9" ry="3" />
    <ellipse cx="5" cy="12" rx="3" ry="9" transform="rotate(-90 5 12)" />
    <ellipse cx="19" cy="12" rx="3" ry="9" transform="rotate(-90 19 12)" />
    <circle cx="12" cy="12" r="1" />
  </svg>
);

export default PhysicsIcon;
