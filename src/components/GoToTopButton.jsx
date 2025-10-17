import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowUpIcon from './icons/ArrowUpIcon';

const Button = styled(motion.button)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.text};
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  transition: all 0.2s;

  @media (hover: hover) {
    &:hover {
      transform: scale(1.1);
      background-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
  }

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 44px;
    height: 44px;
  }
`;

const GoToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          aria-label="Go to top"
        >
          <ArrowUpIcon />
        </Button>
      )}
    </AnimatePresence>
  );
};

export default GoToTopButton;
