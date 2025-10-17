import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { departments } from "../data/books";
import { useAppContext } from "../context/AppContext";
import DepartmentCard from "../components/DepartmentCard";
import BookCard from "../components/BookCard";
import Carousel from "../components/Carousel";
import { useAnimationOnce } from "../hooks/useAnimationOnce";
import { useIsMobile } from "../hooks/useIsMobile";

const TexturedCardWrapper = styled.div`
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    mix-blend-mode: multiply;
    opacity: 0.05;
    pointer-events: none;
    border-radius: 30px;
  }
`;

const HomePageContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;

  @media (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const SeeAllLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  text-decoration: none;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 50px;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;

  @media (min-width: 769px) {
    display: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;

  @media (max-width: 768px) {
    display: block;
    height: 100%;
  }
`;

const DepartmentsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
`;

const DepartmentItem = styled(motion.div)`
  @media (max-width: 768px) {
    flex: 0 0 110px;
    scroll-snap-align: start;
  }
`;

const BooksGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    margin-top: 2.5rem;
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

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const ScrollIndicator = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.text};
  opacity: ${({ $isVisible }) => ($isVisible ? 0.7 : 0)};
  transition: opacity 0.3s;
  z-index: 100;
  animation: ${float} 3s ease-in-out infinite;


`;

const ChevronIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NoResults = styled.div`
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
`;

const SectionTitle = styled.h2`
  margin: 0;
  text-align: left;
  color: ${({ theme }) => theme.text};
`;

const HomePage = () => {
  const { searchTerms, filteredBooks, loading, error } = useAppContext();
  const location = useLocation();
  const pathname = location.pathname;
  const searchTerm = searchTerms[pathname] || '';
  const { t } = useTranslation();
  const shouldAnimate = useAnimationOnce('homePageAnimated');
  const [showScrollIndicator, setShowScrollIndicator] = useState(
    sessionStorage.getItem('hasSeenScrollIndicator') !== 'true'
  );
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        if (showScrollIndicator) {
          setShowScrollIndicator(false);
          sessionStorage.setItem('hasSeenScrollIndicator', 'true');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showScrollIndicator]);

  return (
    <HomePageContainer>
      {searchTerm.trim() === '' && (
        <>
          <SectionHeader>
            <SectionTitle>{t('home.departments')}</SectionTitle>
            <SeeAllLink to="/departments">{t('home.seeAll')}</SeeAllLink>
          </SectionHeader>
          {isMobile ? (
            <div style={{ height: '300px', position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Carousel items={departments} baseWidth={window.innerWidth - 32} autoplay={true} pauseOnHover={true} />
            </div>
          ) : (
            <DepartmentsGrid
              variants={gridVariants}
              initial={shouldAnimate ? "hidden" : "show"}
              animate="show"
            >
              {departments.map((dept) => (
                <DepartmentItem key={dept.name} variants={itemVariants}>
                  <StyledLink to={`/departments/${dept.slug}`}>
                    <TexturedCardWrapper>
                      <DepartmentCard department={dept} isChip />
                    </TexturedCardWrapper>
                  </StyledLink>
                </DepartmentItem>
              ))}
            </DepartmentsGrid>
          )}
        </>
      )}

      {loading && <p>{t('home.loading')}</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          {filteredBooks.length > 0 ? (
            <>
              <SectionHeader>
                <SectionTitle>{t('home.books')}</SectionTitle>
              </SectionHeader>
              <BooksGrid
                variants={gridVariants}
                initial={shouldAnimate ? "hidden" : "show"}
                animate="show"
              >
                {filteredBooks.map((book, index) => (
                  <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                    <BookCard book={book} />
                  </motion.div>
                ))}
              </BooksGrid>
            </>
          ) : (
            searchTerm.trim() !== '' && <NoResults>{t('search.noResults')}</NoResults>
          )}
        </>
      )}
      <ScrollIndicator $isVisible={showScrollIndicator}>
        <span>{t('home.scrollDown')}</span>
        <ChevronIcon />
      </ScrollIndicator>
    </HomePageContainer>
  );
};

export default HomePage;