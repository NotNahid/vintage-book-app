import React, { useState, useEffect, useRef } from "react";
import styled, { useTheme, keyframes } from "styled-components";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SearchDropdown from "./SearchDropdown";

const SearchIconComponent = ({ color }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24' fill='none' stroke={color} strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <circle cx='11' cy='11' r='8'></circle>
    <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
  </svg>
);

const MicIconComponent = ({ color }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="23"></line>
        <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
);

const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.4);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const SearchContainer = styled.div`
  width: 500px;
  transition: width 0.4s ease-in-out, margin 0.4s ease-in-out;
  margin: 2rem auto;
  position: relative;

  body.scrolled & {
    width: 250px;
    margin: 0;
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 30px;
  font-size: 0.9rem;
  background-color: ${({ theme }) => theme.searchBar};
  color: ${({ theme }) => theme.text};
  --search-icon-space: 3rem;
  padding-left: var(--search-icon-space);
  padding-right: 5rem; // Increased padding for mic and clear button
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: 0.5;
  }

  body.scrolled & {
    padding: 0.5rem 1rem;
    padding-left: var(--search-icon-space);
    padding-right: 5rem; // Increased padding for mic and clear button
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.2rem;
    font-size: 0.8rem;
    --search-icon-space: 3.8rem;
    padding-left: var(--search-icon-space);
    padding-right: 5rem; // Increased padding for mic and clear button

    body.scrolled & {
      padding: 0.4rem 0.8rem;
      padding-left: var(--search-icon-space);
      padding-right: 5rem; // Increased padding for mic and clear button
    }
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;

  @media (max-width: 768px) {
    left: 1.2rem;
    width: 16px;
    height: 16px;
  }
`;

const ButtonContainer = styled.div`
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    gap: 0.5rem;
`;

const MicButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: ${({ theme, $isListening }) => ($isListening ? theme.primary : theme.text)};
  animation: ${({ $isListening }) => ($isListening ? pulse : 'none')} 1.5s infinite;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.text};
`;

import { AnimatePresence, motion } from 'framer-motion';

const SearchBar = () => {
  const { searchTerms, searchInputRef, handleSearch, dropdownItems, authorSearchTerm, handleAuthorSearch, filteredAuthors, authorSearchHistory, departmentSearchTerm, handleDepartmentSearch, filteredDepartments, departmentSearchHistory, handleSearchInDepartment, filteredDepartmentBooks, handleSearchInAuthor, filteredAuthorBooks } = useAppContext();
  const location = useLocation();
  const pathname = location.pathname;
  let searchTerm;
  if (pathname === '/authors') {
    searchTerm = authorSearchTerm;
  } else if (pathname === '/departments') {
    searchTerm = departmentSearchTerm;
  } else {
    searchTerm = searchTerms[pathname] || '';
  }

  const [inputValue, setInputValue] = useState(searchTerm);
  const [isListening, setIsListening] = useState(false);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [pageDropdownItems, setPageDropdownItems] = useState([]);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const isSpeechRecognitionSupported = !!SpeechRecognition;

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (!isSpeechRecognitionSupported) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = i18n.language === 'bn' ? 'bn-BD' : 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      if (pathname === '/authors') {
        handleAuthorSearch(transcript);
      } else if (pathname === '/departments') {
        handleDepartmentSearch(transcript);
      } else if (pathname.startsWith('/departments/')) {
        handleSearchInDepartment(transcript);
      } else if (pathname.startsWith('/authors/')) {
        handleSearchInAuthor(transcript);
      } else {
        handleSearch(transcript, pathname);
      }
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [isSpeechRecognitionSupported, handleSearch, handleAuthorSearch, pathname, i18n.language]);

  useEffect(() => {
    if (pathname === '/authors') {
      const authorItems = [
        ...filteredAuthors.slice(0, 5).map(author => ({ name: author.name, type: 'suggestion' })),
        ...authorSearchHistory.map(item => ({ name: item, type: 'history' })),
      ];
      setPageDropdownItems(authorItems);
    } else if (pathname === '/departments') {
      const departmentItems = [
        ...filteredDepartments.slice(0, 5).map(dept => ({ name: dept.name, type: 'suggestion' })),
        ...departmentSearchHistory.map(item => ({ name: item, type: 'history' })),
      ];
      setPageDropdownItems(departmentItems);
    } else if (pathname.startsWith('/departments/')) {
      const departmentBookItems = [
        ...filteredDepartmentBooks.slice(0, 5).map(book => ({ ...book, type: 'suggestion' })),
      ];
      setPageDropdownItems(departmentBookItems);
    } else if (pathname.startsWith('/authors/')) {
      const authorBookItems = [
        ...filteredAuthorBooks.slice(0, 5).map(book => ({ ...book, type: 'suggestion' })),
      ];
      setPageDropdownItems(authorBookItems);
    } else {
      setPageDropdownItems(dropdownItems);
    }
  }, [pathname, filteredAuthors, authorSearchHistory, filteredDepartments, departmentSearchHistory, dropdownItems, filteredDepartmentBooks, filteredAuthorBooks]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (!isHistoryVisible) {
      setIsHistoryVisible(true);
    }
    if (pathname === '/authors') {
      handleAuthorSearch(e.target.value);
    } else if (pathname === '/departments') {
      handleDepartmentSearch(e.target.value);
    } else if (pathname.startsWith('/departments/')) {
      handleSearchInDepartment(e.target.value);
    } else if (pathname.startsWith('/authors/')) {
      handleSearchInAuthor(e.target.value);
    } else {
      handleSearch(e.target.value, pathname);
    }
  };

  const handleClear = () => {
    setInputValue("");
    if (pathname === '/authors') {
      handleAuthorSearch('');
    } else if (pathname === '/departments') {
      handleDepartmentSearch('');
    } else if (pathname.startsWith('/departments/')) {
      handleSearchInDepartment('');
    } else if (pathname.startsWith('/authors/')) {
      handleSearchInAuthor('');
    } else {
      handleSearch("", pathname);
    }
    searchInputRef.current?.focus();
  };

  const handleMicClick = () => {
    if (!isSpeechRecognitionSupported) {
      alert(t('search.voiceNotSupported'));
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      recognitionRef.current?.start();
    }
    setIsListening(!isListening);
  };

  const handleHistoryItemClick = (term) => {
    setInputValue(term);
    if (pathname.startsWith('/book/')) {
      handleSearch(term, '/books', true);
      navigate('/books');
    } else if (pathname === '/authors') {
      handleAuthorSearch(term);
    } else if (pathname === '/departments') {
      handleDepartmentSearch(term);
    } else if (pathname.startsWith('/departments/')) {
      handleSearchInDepartment(term);
    } else if (pathname.startsWith('/authors/')) {
      handleSearchInAuthor(term);
    } else {
      handleSearch(term, pathname, true);
    }
    setIsHistoryVisible(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsHistoryVisible(false);
      if (pathname.startsWith('/book/')) {
        handleSearch(inputValue, '/books', true);
        navigate('/books');
      } else if (activeIndex >= 0) {
        const selectedItem = pageDropdownItems[activeIndex];
        if (pathname === '/authors') {
          handleHistoryItemClick(selectedItem.name);
        } else if (pathname === '/departments') {
          handleHistoryItemClick(selectedItem.name);
        } else if (pathname.startsWith('/departments/')) {
          handleHistoryItemClick(selectedItem.Title);
        } else if (pathname.startsWith('/authors/')) {
          handleHistoryItemClick(selectedItem.Title);
        } else {
          if (selectedItem.type === 'shortcut') {
            // This will be handled by the Link component
          } else if (selectedItem.type === 'suggestion') {
            handleHistoryItemClick(selectedItem.Title);
          } else if (selectedItem.type === 'history') {
            handleHistoryItemClick(selectedItem.term);
          } else if (selectedItem.type === 'recommendation') {
            handleHistoryItemClick(selectedItem.Title);
          }
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prevIndex => (prevIndex + 1) % pageDropdownItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prevIndex => (prevIndex - 1 + pageDropdownItems.length) % pageDropdownItems.length);
    }
  };

  return (
    <SearchContainer>
      <SearchInputContainer>
        <SearchIcon>
          <SearchIconComponent color={theme.text} />
        </SearchIcon>
        <SearchInput
          ref={searchInputRef}
          placeholder={t('search.placeholder')}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsHistoryVisible(true)}
          onBlur={() => setTimeout(() => setIsHistoryVisible(false), 200)}
          onKeyDown={handleKeyDown}
        />
        <ButtonContainer>
            {isSpeechRecognitionSupported && (
                <MicButton onClick={handleMicClick} $isListening={isListening}>
                    <MicIconComponent color={isListening ? theme.primary : theme.text} />
                </MicButton>
            )}
            {inputValue && (
              <ClearButton onClick={handleClear} onMouseDown={(e) => e.preventDefault()}>
                <svg width="12" height="12" viewBox="0 0 14 14">
                  <path d="M 1 1 L 13 13 M 13 1 L 1 13" stroke="currentColor" strokeWidth="2" />
                </svg>
              </ClearButton>
            )}
        </ButtonContainer>
        <AnimatePresence>
          {isHistoryVisible && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'absolute', top: '100%', width: '100%', zIndex: 10 }}
            >
              <SearchDropdown onHistoryItemClick={handleHistoryItemClick} activeIndex={activeIndex} dropdownItems={pageDropdownItems} />
            </motion.div>
          )}
        </AnimatePresence>
      </SearchInputContainer>
    </SearchContainer>
  );
};

export default SearchBar;
