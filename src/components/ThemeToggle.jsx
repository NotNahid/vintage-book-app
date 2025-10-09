import React from 'react';
import styled from 'styled-components';
import { useAppContext } from '../context/AppContext';

const ToggleButton = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  width: 60px;
  height: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  }
`;

const Thumb = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.5);
  transition: transform 0.3s ease;
  transform: translateX(${({ $themeName }) => ($themeName === 'light' ? '0' : '30px')});
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
`;

const SunIcon = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${({ $themeName }) => ($themeName === 'light' ? 1 : 0)};
  transition: opacity 0.3s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background: ${({ theme }) => theme.text};
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 1px;
    height: 100%;
    background: ${({ theme }) => theme.text};
    transform: translateX(-50%);
    box-shadow: 0 0 0 15px ${({ theme }) => theme.text};
    clip-path: polygon(0 0, 100% 0, 100% 25%, 0 25%, 0 75%, 100% 75%, 100% 100%, 0 100%);
  }
`;

const MoonIcon = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: ${({ $themeName }) => ($themeName === 'dark' ? 1 : 0)};
  transition: opacity 0.3s ease;
  
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8px;
    height: 8px;
    background: transparent;
    border-radius: 50%;
    box-shadow: -2px 0 0 0 ${({ theme }) => theme.text};
    transform: translate(-50%, -50%) rotate(-30deg);
  }
`;

const ThemeToggle = () => {
  const { theme, setTheme } = useAppContext();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ToggleButton onClick={toggleTheme}>
      <Thumb $themeName={theme}>
        <IconWrapper>
          <SunIcon $themeName={theme} />
          <MoonIcon $themeName={theme} />
        </IconWrapper>
      </Thumb>
    </ToggleButton>
  );
};

export default ThemeToggle;
