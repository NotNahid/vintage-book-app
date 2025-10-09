import React from 'react';
import styled from 'styled-components';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1999;
`;

const ShortcutListContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  padding: 1rem;
  z-index: 2000;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Title = styled.h3`
  margin-top: 0;
`;

const ShortcutList = ({ setIsShortcutListOpen }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsShortcutListOpen(false);
    }
  };

  return (
    <Backdrop onClick={handleBackdropClick}>
      <ShortcutListContainer>
        <Title>Keyboard Shortcuts</Title>
        <ul>
          <li><strong>Alt + l</strong>: Open Quick Navigation</li>
          <li><strong>Alt + h</strong>: Go to Home</li>
          <li><strong>Alt + d</strong>: Go to Departments</li>
          <li><strong>Alt + a</strong>: Go to All Books</li>
          <li><strong>Alt + u</strong>: Go to Authors</li>
          <li><strong>Alt + ?</strong>: Go to Help/About</li>
          <li><strong>/</strong>: Focus Search Bar</li>
          <li><strong>Esc</strong>: Close Quick Navigation / Shortcut List</li>
        </ul>
      </ShortcutListContainer>
    </Backdrop>
  );
};

export default ShortcutList;
