import React from 'react';

const ArtJar: React.FC = () => {
  return (
    <div className="relative w-20 h-24 flex items-end justify-center mx-2">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Jar */}
        <path d="M 25 10 L 75 10 L 70 90 L 30 90 Z" fill="#C0DDEB" fillOpacity="0.5" />
        {/* Pencils */}
        <rect x="35" y="15" width="5" height="70" fill="#FFC107" />
        <polygon points="35,15 40,15 37.5,10" fill="#212121" />
        <rect x="45" y="15" width="5" height="70" fill="#F44336" />
        <polygon points="45,15 50,15 47.5,10" fill="#212121" />
        {/* Paintbrush */}
        <rect x="55" y="15" width="5" height="50" fill="#8D6E63" />
        <rect x="52" y="65" width="11" height="5" fill="#757575" />
        <path d="M 52 70 Q 57.5 80 63 70 L 52 70 Z" fill="#A1887F" />
      </svg>
    </div>
  );
};

export default ArtJar;