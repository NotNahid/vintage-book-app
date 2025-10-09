import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 5rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin: 1rem 0;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HomeLink = styled(Link)`
  margin-top: 2rem;
  padding: 1rem 2rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }
`;

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Subtitle>{t('notFound.title')}</Subtitle>
      <p>{t('notFound.message')}</p>
      <HomeLink to="/">{t('notFound.goHome')}</HomeLink>
    </NotFoundContainer>
  );
};

export default NotFoundPage;