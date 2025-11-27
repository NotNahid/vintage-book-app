import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const SearchResultsContainer = styled(motion.div)`
  margin-top: 1rem;
`;

const BookList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const BookEntryLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const BookEntry = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundSecondary};
  }
`;

const BookCover = styled.img`
  width: 4rem;
  height: 6rem;
  border-radius: 0.5rem;
  object-fit: cover;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BookDetails = styled.div`
  flex: 1;
`;

const BookTitle = styled.h3`
  font-weight: 700;
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
`;

const BookAuthor = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const BookEdition = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 0.25rem;
`;

const NoResults = styled.div`
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
`;

const MobileSearchResults = () => {
  const { t } = useTranslation();
  const { filteredBooks } = useAppContext();

  if (filteredBooks.length === 0) {
    return <NoResults>{t('search.noResults')}</NoResults>;
  }

  return (
    <SearchResultsContainer
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <BookList>
        {filteredBooks.map((book, index) => (
          <BookEntryLink to={`/book/${book.ISBN}`} key={book.ISBN || index}>
            <BookEntry
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <BookCover src={book['Cover URL'] || `https://placehold.co/64x96/${index % 2 === 0 ? 'D2B48C' : '22C55E'}/FFFFFF?text=Book`} alt={book.Title} />
              <BookDetails>
                <BookTitle>{book.Title}</BookTitle>
                <BookAuthor>{book.Author}</BookAuthor>
                {book.Edition && <BookEdition>{t('book.edition', { edition: book.Edition })}</BookEdition>}
              </BookDetails>
            </BookEntry>
          </BookEntryLink>
        ))}
      </BookList>
    </SearchResultsContainer>
  );
};

export default MobileSearchResults;
