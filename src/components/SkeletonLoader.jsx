import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const SkeletonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const SkeletonCard = styled.div`
  background-color: ${({ theme }) => theme.backgroundSecondary};
  border-radius: 0.75rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SkeletonIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  animation: ${shimmer} 1s infinite linear;
`;

const SkeletonText = styled.div`
  width: 70%;
  height: 1rem;
  background: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  animation: ${shimmer} 1s infinite linear;
`;

const SkeletonBookWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const SkeletonBookEntry = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SkeletonBookCover = styled.div`
  width: 4rem;
  height: 6rem;
  border-radius: 0.5rem;
  background: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
  animation: ${shimmer} 1s infinite linear;
`;

const SkeletonBookDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SkeletonLoader = () => {
  return (
    <>
      <SkeletonWrapper>
        {[...Array(8)].map((_, index) => (
          <SkeletonCard key={index}>
            <SkeletonIcon />
            <SkeletonText />
          </SkeletonCard>
        ))}
      </SkeletonWrapper>
      <SkeletonBookWrapper>
        {[...Array(5)].map((_, index) => (
          <SkeletonBookEntry key={index}>
            <SkeletonBookCover />
            <SkeletonBookDetails>
              <SkeletonText />
              <SkeletonText style={{ width: '50%' }} />
            </SkeletonBookDetails>
          </SkeletonBookEntry>
        ))}
      </SkeletonBookWrapper>
    </>
  );
};

export default SkeletonLoader;
