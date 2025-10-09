import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import BookCard from "../components/BookCard";
import { departments } from "../data/books";
import { useAppContext } from "../context/AppContext";
import { useAnimationOnce } from "../hooks/useAnimationOnce";

const DepartmentPageContainer = styled.div`
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

export default function DepartmentPage() {
  const { t } = useTranslation();
  const { setDepartment, filteredDepartmentBooks } = useAppContext();
  const { departmentSlug } = useParams();
  const shouldAnimate = useAnimationOnce(`departmentPageAnimated-${departmentSlug}`);

  const department = departments.find(d => d.slug === departmentSlug);

  useEffect(() => {
    if (department) {
      setDepartment(department.name);
    }
  }, [department, setDepartment]);

  if (!department) {
    return (
      <DepartmentPageContainer>
        <h1>{t('departments.notFound')}</h1>
      </DepartmentPageContainer>
    );
  }

  return (
    <DepartmentPageContainer>
      <h1>{department.name}</h1>
      {filteredDepartmentBooks.length > 0 ? (
        <BooksGrid
          variants={gridVariants}
          initial={shouldAnimate ? "hidden" : "show"}
          animate="show"
        >
          {filteredDepartmentBooks.map((book, index) => (
            <motion.div key={index} variants={itemVariants}>
              <BookCard book={book} />
            </motion.div>
          ))}
        </BooksGrid>
      ) : (
        <NoResults>No books found</NoResults>
      )}
    </DepartmentPageContainer>
  );
}