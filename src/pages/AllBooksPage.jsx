import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import BookCard from "../components/BookCard";
import { useAppContext } from "../context/AppContext";
import { useAnimationOnce } from "../hooks/useAnimationOnce";

const AllBooksPageContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
`;

const BooksGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const gridVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const NoResults = styled.div`
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
`;

const AllBooksPage = () => {
  const { searchTerms, filteredBooks, loading, error } = useAppContext();
  const location = useLocation();
  const pathname = location.pathname;
  const searchTerm = searchTerms[pathname] || '';
  const { t } = useTranslation();
  const shouldAnimate = useAnimationOnce('allBooksPageAnimated');

  return (
    <AllBooksPageContainer>
      <h1>{t('allBooks.title')}</h1>
      {loading && <p>{t('home.loading')}</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          {filteredBooks.length > 0 ? (
            <BooksGrid
              variants={gridVariants}
              initial={shouldAnimate ? "hidden" : "show"}
              animate="show"
            >
              {filteredBooks.map((book, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <BookCard book={book} />
                </motion.div>
              ))}
            </BooksGrid>
          ) : (
            <NoResults>{t('search.noResults')}</NoResults>
          )}
        </>
      )}
    </AllBooksPageContainer>
  );
};

export default AllBooksPage;
