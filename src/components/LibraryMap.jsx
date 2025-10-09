import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
`;

const LibraryMapContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-top: 2rem;
`;

const Shelf = styled.div`
  background-color: #ccc;
  border: 1px solid #999;
  padding: 1rem;
  border-radius: 5px;
  font-weight: bold;
  color: #333;

  &.active {
    background-color: #a8e6cf;
    box-shadow: 0 0 10px #a8e6cf;
  }
`;

const LibraryMap = ({ location, onClose }) => {
  const getShelfNumber = (locationString) => {
    if (!locationString) return -1;
    const shelfMatch = locationString.match(/Shelf No: (\d+)/);
    return shelfMatch ? parseInt(shelfMatch[1], 10) : -1;
  };

  const activeShelf = getShelfNumber(location);

  return (
    <ModalOverlay onClick={onClose}>
      <CloseButton onClick={onClose}>&times;</CloseButton>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Library Section Map</h2>
        <p>Shelf No: {activeShelf} is highlighted</p>
        <LibraryMapContainer>
          {[...Array(20)].map((_, i) => (
            <Shelf key={i} className={i + 1 === activeShelf ? 'active' : ''}>
              {i + 1}
            </Shelf>
          ))}
        </LibraryMapContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LibraryMap;