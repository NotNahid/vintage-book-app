import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.body};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 999;
  transition: transform 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(100%)')};
`;

const MenuLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;

  a {
    color: ${({ theme }) => theme.text};
    text-decoration: none;
    font-size: 2rem;
    font-weight: bold;
  }
`;

const MobileMenu = ({ isOpen, onLinkClick }) => {
  return (
    <MenuContainer isOpen={isOpen}>
      <MenuLinks>
        <Link to="/" onClick={onLinkClick}>Home</Link>
        <Link to="/departments" onClick={onLinkClick}>Departments</Link>
        <Link to="/books" onClick={onLinkClick}>All Books</Link>
        <Link to="/authors" onClick={onLinkClick}>Authors</Link>
        <Link to="/about" onClick={onLinkClick}>Help/About</Link>
      </MenuLinks>
    </MenuContainer>
  );
};

export default MobileMenu;
