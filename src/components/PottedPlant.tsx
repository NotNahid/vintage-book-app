import React from 'react';

const PottedPlant: React.FC = () => {
  return (
    <div className="potted-plant mx-auto my-4 md:mx-0 md:my-0">
      <div className="plant-stem"></div>
      <div className="plant-leaf" style={{ transform: 'rotate(-30deg)' }}></div>
      <div className="plant-leaf" style={{ transform: 'rotate(30deg) scaleX(-1)' }}></div>
      <div className="pot"></div>
    </div>
  );
};

export default PottedPlant;
