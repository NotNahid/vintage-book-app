import React, { useState } from 'react';
import styled from 'styled-components';
import PlaceholderCover from './PlaceholderCover';
import TinyPlaceholder from './TinyPlaceholder';

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Cover = ({ src, alt, title, author, size = 'large' }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  if (error || !src) {
    if (size === 'tiny') {
      return <TinyPlaceholder />;
    }
    return <PlaceholderCover title={title} author={author} />;
  }

  return <Image src={src} alt={alt} onError={handleError} />;
};

export default Cover;