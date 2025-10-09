import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const AboutPageContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const UniversityName = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const LibraryName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const UniversityLink = styled.a`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const AboutPage = () => {
  const { t } = useTranslation();
  return (
    <AboutPageContainer>
      <UniversityName>{t('about.university')}</UniversityName>
      <LibraryName>{t('about.library')}</LibraryName>
      <p>{t('about.description1')}</p>
      <p>{t('about.description2')}</p>
      <UniversityLink href="https://eub.edu.bd" target="_blank" rel="noopener noreferrer">
        {t('about.visit')}
      </UniversityLink>
    </AboutPageContainer>
  );
};

export default AboutPage;
