import React from 'react';
import styled from 'styled-components';

const Tag = styled.span`
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-size: 0.7rem;
  margin-left: 0.5rem;
`;

const GenreTag = ({ genre }) => {
  if (!genre) {
    return null;
  }

  return <Tag>{genre}</Tag>;
};

export default GenreTag;