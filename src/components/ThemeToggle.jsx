import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

const IconButton = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: none;
  color: ${({ theme }) => theme.text};
  padding: 0.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    padding: 0;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ThemeToggle = () => {
  const { theme, setTheme } = useAppContext();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton onClick={toggleTheme}>
      {theme === 'light' ? <MoonIcon size={16} /> : <SunIcon size={16} />}
    </IconButton>
  );
};

export default ThemeToggle;