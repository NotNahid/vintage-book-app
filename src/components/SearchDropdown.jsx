import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import ClockIcon from './icons/ClockIcon';
import StarIcon from './icons/StarIcon';
import Cover from './Cover';
import GenreTag from './GenreTag';
import HighlightMatch from './HighlightMatch';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scaleY(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scaleY(1) translateY(0);
  }
`;

const SearchDropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.searchBar};
  border-radius: 0 0 30px 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 10;
  animation: ${fadeIn} 0.2s ease-out;
  transform-origin: top center;
  outline: none;
`;

const SectionTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.5rem;
  }
`;

const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const HistoryItem = styled(motion.li)`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  justify-content: space-between;

  &:hover, &.active {
    background-color: ${({ theme }) => theme.body};
  }
`;

const HistoryItemContent = styled.div`
  display: flex;
  align-items: center;
`;

const CoverContainer = styled.div`
  width: 25px;
  height: 35px;
  margin-right: 1rem;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`;

const ShortcutItem = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  font-weight: bold;
  color: ${({ theme }) => theme.primary};

  &:hover, &.active {
    text-decoration: underline;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.body};
  margin: 0.5rem 0;
`;

const SearchDropdown = ({ dropdownItems, activeIndex, onHistoryItemClick }) => {
  const { searchTerms, removeSearchHistoryItem, removeAuthorSearchHistoryItem, removeDepartmentSearchHistoryItem } = useAppContext();
  const location = useLocation();
  const searchTerm = searchTerms[location.pathname] || '';

  if (dropdownItems.length === 0) {
    return null;
  }

  const authorShortcut = dropdownItems.find(item => item.type === 'shortcut');
  const suggestions = dropdownItems.filter(item => item.type === 'suggestion');
  const searchHistory = dropdownItems.filter(item => item.type === 'history');
  const recommendations = dropdownItems.filter(item => item.type === 'recommendation');

  return (
    <SearchDropdownContainer onMouseDown={(e) => e.preventDefault()}>
      {authorShortcut && (
        <>
          <Link to={`/authors/${authorShortcut.slug}`}>
            <ShortcutItem className={activeIndex === dropdownItems.indexOf(authorShortcut) ? 'active' : ''}>
              See all books by {authorShortcut.name} →
            </ShortcutItem>
          </Link>
          <Divider />
        </>
      )}
      {suggestions.length > 0 && (
        <>
          <SectionTitle>Suggestions</SectionTitle>
          <HistoryList>
            {suggestions.map((item, index) => (
              <HistoryItem key={index} onClick={() => onHistoryItemClick(item.Title || item.name)} className={activeIndex === dropdownItems.indexOf(item) ? 'active' : ''}>
                <HistoryItemContent>
                  {item.Title ? (
                    <>
                      <CoverContainer>
                        <Cover src={item['Cover URL']} alt={item.Title} title={item.Title} author={item.Author} size="tiny" />
                      </CoverContainer>
                      <HighlightMatch text={item.Title} highlight={searchTerm} />
                    </>
                  ) : (
                    <HighlightMatch text={item.name} highlight={searchTerm} />
                  )}
                </HistoryItemContent>
              </HistoryItem>
            ))}
          </HistoryList>
          <Divider />
        </>
      )}
      {searchHistory.length > 0 && (
        <>
          <SectionTitle><ClockIcon />Recently Searched</SectionTitle>
          <HistoryList>
            <AnimatePresence>
              {searchHistory.map((item, index) => (
                <HistoryItem
                  key={index}
                  onClick={() => onHistoryItemClick(item.term || item.name)}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.2 }}
                  className={activeIndex === dropdownItems.indexOf(item) ? 'active' : ''}
                >
                  <HistoryItemContent>
                    {item.term ? (
                      <>
                        <CoverContainer>
                          <Cover src={item.cover} alt={item.term} title={item.term} size="tiny" />
                        </CoverContainer>
                        <span>{item.term}</span>
                      </>
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </HistoryItemContent>
                  <ClearButton onClick={(e) => { e.stopPropagation(); if (item.term) { removeSearchHistoryItem(item.term); } else if (location.pathname === '/authors') { removeAuthorSearchHistoryItem(item.name); } else if (location.pathname === '/departments') { removeDepartmentSearchHistoryItem(item.name); } }}>×</ClearButton>
                </HistoryItem>
              ))}
            </AnimatePresence>
          </HistoryList>
          <Divider />
        </>
      )}
      {recommendations.length > 0 && (
        <>
          <SectionTitle><StarIcon />Recommended for You</SectionTitle>
          <HistoryList>
            {recommendations.map((book, index) => (
              <HistoryItem key={index} onClick={() => onHistoryItemClick(book.Title)} className={activeIndex === dropdownItems.indexOf(book) ? 'active' : ''}>
                <HistoryItemContent>
                  <CoverContainer>
                    <Cover src={book.Cover} alt={book.Title} title={book.Title} author={book.Author} size="tiny" />
                  </CoverContainer>
                  <span>{book.Title}</span>
                  <GenreTag genre={book.Department} />
                </HistoryItemContent>
              </HistoryItem>
            ))}
          </HistoryList>
        </>
      )}
    </SearchDropdownContainer>
  );
};

export default SearchDropdown;