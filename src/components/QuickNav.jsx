import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const QuickNavContainer = styled.div.attrs(props => ({
  style: {
    top: `${props.position.y}px`,
    left: `${props.position.x}px`,
    transform: 'translate(-50%, -50%)',
  },
}))`
  position: fixed;
  width: 400px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 50px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  padding: 0.5rem;
  z-index: 1000;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const DragHandle = styled.div`
  width: 10px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  cursor: move;
  margin-right: 0.5rem;
`;

const Content = styled.div`
  flex-grow: 1;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-radius: 50px;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  outline: none;
`;

const SuggestionsList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
`;

const SuggestionItem = styled.li`
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 50px;
  ${({ isActive }) => isActive && css`
    background-color: rgba(255, 255, 255, 0.2);
  `}
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Departments', path: '/departments' },
  { name: 'All Books', path: '/books' },
  { name: 'Authors', path: '/authors' },
  { name: 'Help/About', path: '/about' },
];

const QuickNav = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState(pages);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const { handleSearch, setIsQuickNavOpen } = useAppContext();
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const dragStartPos = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (inputValue) {
      const filteredPages = pages.filter(page =>
        page.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setSuggestions(filteredPages);
      setActiveSuggestionIndex(0);
    } else {
      setSuggestions(pages);
      setActiveSuggestionIndex(0);
    }
  }, [inputValue]);

  const handleSuggestionClick = (path) => {
    navigate(path);
    setIsQuickNavOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (suggestions.length > 0) {
        handleSuggestionClick(suggestions[activeSuggestionIndex].path);
      } else {
        handleSearch(inputValue, '/');
        navigate('/');
        setIsQuickNavOpen(false);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIndex(prevIndex =>
        prevIndex === 0 ? suggestions.length - 1 : prevIndex - 1
      );
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIndex(prevIndex =>
        prevIndex === suggestions.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsQuickNavOpen(false);
    }
  };

  const onMouseDown = (e) => {
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e) => {
    if (isDragging) {
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;
      setPosition({
        x: position.x + dx,
        y: position.y + dy,
      });
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Backdrop onClick={handleBackdropClick} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
      <QuickNavContainer ref={containerRef} position={position}>
        <DragHandle onMouseDown={onMouseDown} />
        <Content>
          <Input
            type="text"
            placeholder="Navigate or search..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <SuggestionsList>
            {suggestions.map((page, index) => (
              <SuggestionItem
                key={page.path}
                isActive={index === activeSuggestionIndex}
                onClick={() => handleSuggestionClick(page.path)}
              >
                {page.name}
              </SuggestionItem>
            ))}
          </SuggestionsList>
        </Content>
      </QuickNavContainer>
    </Backdrop>
  );
};

export default QuickNav;