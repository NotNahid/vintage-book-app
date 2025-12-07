import React from 'react';

const RolledPapers: React.FC = () => {
  return (
    <div className="relative w-20 h-20 flex items-end justify-center mx-2">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Rolled paper 1 */}
        <rect x="15" y="30" width="20" height="60" fill="#F5F5DC" rx="10" />
        <rect x="10" y="55" width="30" height="5" fill="#8B4513" rx="2.5" />
        {/* Rolled paper 2 */}
        <rect x="40" y="20" width="20" height="70" fill="#F5F5DC" rx="10" />
        <rect x="35" y="50" width="30" height="5" fill="#8B4513" rx="2.5" />
        {/* Rolled paper 3 */}
        <rect x="65" y="25" width="20" height="65" fill="#F5F5DC" rx="10" />
        <rect x="60" y="52" width="30" height="5" fill="#8B4513" rx="2.5" />
      </svg>
    </div>
  );
};

export default RolledPapers;
