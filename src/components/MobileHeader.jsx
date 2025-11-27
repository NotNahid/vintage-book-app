import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import SearchIcon from './icons/SearchIcon';
import SearchBar from './SearchBar';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-end; /* Align icon to the right */
  align-items: center;
  padding: 1.25rem; /* p-5 in tailwind */
  border-bottom: 1px solid transparent; /* Remove border */
  background-color: transparent;
  position: relative; /* For positioning the search container */

  @media (min-width: 769px) {
    display: none; /* Hide on desktop */
  }
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem; /* space-x-5 in tailwind */

  svg {
    color: ${({ theme }) => theme.text};
    cursor: pointer;
  }
`;

const SearchContainer = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 1rem;
  background-color: ${({ theme }) => theme.body};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const MobileHeader = ({ isScrolled }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    if (isSearchOpen) {
      // Use a timeout to ensure the input is rendered before focusing
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  return (
    <>
      <HeaderContainer>
        <IconGroup>
          <SearchIcon size={24} onClick={toggleSearch} />
        </IconGroup>
      </HeaderContainer>
      <AnimatePresence>
        {isSearchOpen && (
          <SearchContainer
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <SearchBar isScrolled={isScrolled} ref={searchInputRef} isMobileGlobalSearch={true} />
          </SearchContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileHeader;
