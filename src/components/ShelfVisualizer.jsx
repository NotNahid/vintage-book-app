import React from 'react';
import styled, { keyframes } from 'styled-components';

const glow = keyframes`
  0% { box-shadow: 0 0 5px #a8e6cf; }
  50% { box-shadow: 0 0 20px #a8e6cf; }
  100% { box-shadow: 0 0 5px #a8e6cf; }
`;

const ShelfContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  perspective: 1000px;
`;

const Shelf = styled.div`
  width: 150px;
  height: 200px;
  background-color: #8B4513; /* SaddleBrown */
  border: 5px solid #A0522D; /* Sienna */
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  transform: rotateY(-10deg);
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
  transform: rotateY(0deg) scale(1.05);
  box-shadow: 0 0 30px #a8e6cf;
`;

const ShelfLabel = styled.div`
  text-align: center;
  padding: 5px;
  background-color: #A0522D;
  color: white;
  font-weight: bold;
`;

const ShelfRow = styled.div`
  flex: 1;
  border-bottom: 3px solid #A0522D;
  background-image: linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px);
  background-size: 100% 20%;

  &.active-row {
    animation: ${glow} 1.5s infinite;
    background-color: rgba(168, 230, 207, 0.5);
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ShelfVisualizer = ({ location }) => {
  const getShelfAndRow = (locationString) => {
    if (!locationString) return { shelf: -1, row: -1 };
    const shelfMatch = locationString.match(/Shelf No: (\d+)/);
    const rowMatch = locationString.match(/(\w+)\s+Row/);

    const shelf = shelfMatch ? parseInt(shelfMatch[1], 10) : -1;

    let row = -1;
    if (rowMatch) {
      const rowName = rowMatch[1].toLowerCase();
      switch (rowName) {
        case 'first': row = 1; break;
        case 'second': row = 2; break;
        case 'third': row = 3; break;
        case 'fourth': row = 4; break;
        case 'fifth': row = 5; break;
        case 'sixth': row = 6; break;
        default: row = -1;
      }
    }
    return { shelf, row };
  };

  const { shelf: activeShelf, row: activeRow } = getShelfAndRow(location);

  if (activeShelf === -1) {
    return null; // Don't render if shelf number is not found
  }

  return (
    <ShelfContainer>
      <Shelf>
        <ShelfLabel>Shelf {activeShelf}</ShelfLabel>
        {[...Array(6)].map((_, i) => (
          <ShelfRow key={i} className={i + 1 === activeRow ? 'active-row' : ''} />
        ))}
      </Shelf>
    </ShelfContainer>
  );
};

export default ShelfVisualizer;