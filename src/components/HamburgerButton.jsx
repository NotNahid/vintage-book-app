import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 1000;

  @media (max-width: 768px) {
    display: block;
  }

  & > span {
    display: block;
    width: 25px;
    height: 3px;
    background-color: ${({ theme }) => theme.text};
    margin: 5px 0;
    transition: transform 0.3s, opacity 0.3s;
  }

  &.open > span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  &.open > span:nth-child(2) {
    opacity: 0;
  }

  &.open > span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
`;

const HamburgerButton = ({ isOpen, onClick }) => {
  return (
    <Button className={isOpen ? 'open' : ''} onClick={onClick}>
      <span></span>
      <span></span>
      <span></span>
    </Button>
  );
};

export default HamburgerButton;
