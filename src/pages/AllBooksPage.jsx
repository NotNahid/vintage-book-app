import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import BookCard from "../components/BookCard";
import { useAppContext } from "../context/AppContext";
import { useAnimationOnce } from "../hooks/useAnimationOnce";
import { departments } from "../data/books";

const AllBooksPageContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Filter = styled.select`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: none;
  color: ${({ theme }) => theme.text};
  padding: 0.5rem 1rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;

  option {
    background-color: ${({ theme }) => theme.searchBar};
    color: ${({ theme }) => theme.text};
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryHover};
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  margin: 0 1rem;
`;

const AllBooksPage = () => {
  const { searchTerms, filteredBooks, loading, error, allAuthors, isDataLoaded } = useAppContext();
  const location = useLocation();
  const pathname = location.pathname;
  const searchTerm = searchTerms[pathname] || '';
  const { t } = useTranslation();
  const shouldAnimate = useAnimationOnce('allBooksPageAnimated');

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedAuthor, setSelectedAuthor] = useState("all");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const booksPerPage = 12;

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setCurrentPage(1);
  };

  const handleAuthorChange = (e) => {
    setSelectedAuthor(e.target.value);
    setCurrentPage(1);
  };

  const handleAvailabilityChange = (e) => {
    setShowAvailableOnly(e.target.checked);
    setCurrentPage(1);
  };

  const filteredByDept = selectedDepartment === "all"
    ? filteredBooks
    : filteredBooks.filter(book => book.Department === selectedDepartment);

  const filteredByAuthor = selectedAuthor === "all"
    ? filteredByDept
    : filteredByDept.filter(book => book.Author === selectedAuthor);

  const filteredByAvailability = showAvailableOnly
    ? filteredByAuthor.filter(book => book.Availability.toLowerCase() === "true")
    : filteredByAuthor;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredByAvailability.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredByAvailability.length / booksPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <AllBooksPageContainer>
      <h1>{t('allBooks.title')}</h1>
      <FilterContainer>
        <Filter onChange={handleDepartmentChange} value={selectedDepartment}>
          <option value="all">{t('allBooks.allDepartments')}</option>
          {departments.map(dept => (
            <option key={dept.slug} value={dept.name}>{dept.name}</option>
          ))}
        </Filter>
        {isDataLoaded && allAuthors && (
          <Filter onChange={handleAuthorChange} value={selectedAuthor}>
            <option value="all">{t('allBooks.allAuthors')}</option>
            {allAuthors.map(author => (
              <option key={author.name} value={author.name}>{author.name}</option>
            ))}
          </Filter>
        )}
        <CheckboxLabel>
          <input type="checkbox" onChange={handleAvailabilityChange} checked={showAvailableOnly} />
          {t('allBooks.showAvailableOnly')}
        </CheckboxLabel>
      </FilterContainer>
      {loading && <p>{t('home.loading')}</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          {currentBooks.length > 0 ? (
            <>
              <BooksGrid
                variants={gridVariants}
                initial={shouldAnimate ? "hidden" : "show"}
                animate="show"
              >
                {currentBooks.map((book, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    <BookCard book={book} />
                  </motion.div>
                ))}
              </BooksGrid>
              {totalPages > 1 && (
                <PaginationContainer>
                  <PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>
                    {t('pagination.previous')}
                  </PaginationButton>
                  <PageInfo>
                    {t('pagination.page')} {currentPage} {t('pagination.of')} {totalPages}
                  </PageInfo>
                  <PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>
                    {t('pagination.next')}
                  </PaginationButton>
                </PaginationContainer>
              )}
            </>
          ) : (
            <NoResults>{t('search.noResults')}</NoResults>
          )}
        </>
      )}
    </AllBooksPageContainer>
  );
};

export default AllBooksPage;