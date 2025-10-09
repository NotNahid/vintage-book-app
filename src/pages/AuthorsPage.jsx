import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../context/AppContext";
import { useAnimationOnce } from "../hooks/useAnimationOnce";

const AuthorsPageContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
`;

const AuthorsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const AuthorCard = styled(Link)`
  text-decoration: none;
  color: inherit;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(3px);
  border-radius: 10px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.2s;
  
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const AuthorName = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BookCount = styled.p`
  margin: 0.5rem 0 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.textMuted};
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

const AuthorsPage = () => {
  const { filteredAuthors } = useAppContext();
  const { t } = useTranslation();
  const shouldAnimate = useAnimationOnce('authorsPageAnimated');

  return (
    <AuthorsPageContainer>
      <h1>{t('authorsPage.title')}</h1>
      {filteredAuthors.length > 0 ? (
        <AuthorsGrid
          variants={gridVariants}
          initial={shouldAnimate ? "hidden" : "show"}
          animate="show"
        >
          {filteredAuthors.map(author => (
            <motion.div key={author.name} variants={itemVariants}>
              <AuthorCard to={`/authors/${author.name}`}>
                <AuthorName>{author.name}</AuthorName>
                <BookCount>{author.count} {author.count > 1 ? t('authorsPage.books') : t('authorsPage.book')}</BookCount>
              </AuthorCard>
            </motion.div>
          ))}
        </AuthorsGrid>
      ) : (
        <NoResults>{t('search.noResults')}</NoResults>
      )}
    </AuthorsPageContainer>
  );
};

export default AuthorsPage;