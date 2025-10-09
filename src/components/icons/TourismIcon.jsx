import React from 'react';

const TourismIcon = ({ color = 'currentColor', size = 24 }) => (
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
    <path d="M17.8 19.2 16 11l3.5-3.5C21.3 5.7 22 4 22 3c0-1.1-.9-2-2-2-1 0-2.7.7-4.3 2.5L12 7 9.2 4.2 8 3 4 2l-2 4 1.2 1.2L7 12l-1.8 1.8L3 16l8 2 2.8-2.8L16 19l1.2 1.2 4-2-1.4-1.4z" />
  </svg>
);

export default TourismIcon;
