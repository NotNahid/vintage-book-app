import React from 'react';
import styled from 'styled-components';

const PlaceholderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 10px;
`;

const PlaceholderContent = styled.div`
  width: 80%;
  aspect-ratio: 2 / 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Allow up to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Author = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0 0;
  display: none;
`;

const PlaceholderCover = ({ title, author }) => {
  return (
    <PlaceholderContainer>
      <PlaceholderContent>
        <Title>{title}</Title>
        <Author>{author}</Author>
      </PlaceholderContent>
    </PlaceholderContainer>
  );
};

export default PlaceholderCover;