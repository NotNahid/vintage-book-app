import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { departments } from "../data/books";
import DepartmentCard from "../components/DepartmentCard";
import { useAppContext } from "../context/AppContext";
import { useAnimationOnce } from "../hooks/useAnimationOnce";

const DepartmentsPageContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
`;

const DepartmentsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
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

const DepartmentsPage = () => {
  const { t } = useTranslation();
  const { filteredDepartments } = useAppContext();
  const shouldAnimate = useAnimationOnce('departmentsPageAnimated');

  return (
    <DepartmentsPageContainer>
      <h1>{t('departments.title')}</h1>
      {filteredDepartments.length > 0 ? (
        <DepartmentsGrid
          variants={gridVariants}
          initial={shouldAnimate ? "hidden" : "show"}
          animate="show"
        >
          {filteredDepartments.map((dept) => (
            <motion.div key={dept.name} variants={itemVariants}>
              <Link to={`/departments/${dept.slug}`} style={{ textDecoration: 'none' }}>
                <DepartmentCard department={dept} />
              </Link>
            </motion.div>
          ))}
        </DepartmentsGrid>
      ) : (
        <NoResults>{t('search.noResults')}</NoResults>
      )}
    </DepartmentsPageContainer>
  );
};

export default DepartmentsPage;