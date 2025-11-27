import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import BookCard from './BookCard'; // Assuming BookCard can be adapted or a new one created
import { useTranslation } from 'react-i18next';

const SectionContainer = styled(motion.section)`
  margin-top: 2rem; /* mt-8 in tailwind */

  @media (min-width: 769px) {
    display: none; /* Hide on desktop */
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem; /* text-2xl in tailwind */
  font-weight: 600; /* font-semibold in tailwind */
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem; /* mb-4 in tailwind */
`;

const BookList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem; /* space-y-5 in tailwind */
`;

const BookEntry = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 1rem; /* space-x-4 in tailwind */
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.backgroundSecondary};
  }
`;

const BookCover = styled.img`
  width: 4rem; /* w-16 in tailwind */
  height: 6rem; /* h-24 in tailwind */
  border-radius: 0.5rem; /* rounded-lg in tailwind */
  object-fit: cover;
  background-color: ${({ theme }) => theme.backgroundSecondary};
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BookDetails = styled.div`
  flex: 1;
`;

const BookTitle = styled.h3`
  font-weight: 700; /* font-bold */
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
`;

const BookAuthor = styled.p`
  font-size: 0.875rem; /* text-sm */
  color: ${({ theme }) => theme.textSecondary};
`;

const BookEdition = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-top: 0.25rem;
`;

const OptionsIcon = styled.svg`
  color: ${({ theme }) => theme.textSecondary};
`;

import { Link } from 'react-router-dom';

// ... (imports and other styled components)

const BookEntryLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const RecentlyAddedBooks = () => {
  const { t } = useTranslation();
  const { filteredBooks } = useAppContext(); // Assuming filteredBooks contains recently added or can be filtered

  // For demonstration, let's take the first few books from filteredBooks
  // In a real app, you'd have a dedicated "recently added" data source
  const recentlyAdded = filteredBooks.slice(0, 5); // Display top 5 for example

  return (
    <SectionContainer
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
      <SectionTitle>{t('home.recentlyAdded')}</SectionTitle>
      <BookList>
        {recentlyAdded.map((book, index) => (
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
              <OptionsIcon xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </OptionsIcon>
            </BookEntry>
          </BookEntryLink>
        ))}
      </BookList>
    </SectionContainer>
  );
};

export default RecentlyAddedBooks;
