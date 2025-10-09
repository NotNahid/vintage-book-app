import React from 'react';
import styled, { keyframes } from 'styled-components';

const flip = keyframes`
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(-160deg);
  }
`;

const BookWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-left: 8px;
  vertical-align: middle;
`;

const Book = styled.div`
  width: 20px;
  height: 16px;
  position: relative;
  perspective: 400px;
`;

const Page = styled.div`
  position: absolute;
  width: 10px;
  height: 16px;
  background: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.text};
`;

const LeftPage = styled(Page)`
  left: 0;
  border-radius: 2px 0 0 2px;
`;

const FlippingPage = styled(Page)`
  left: 10px;
  transform-origin: left center;
  border-radius: 0 2px 2px 0;
  animation: ${flip} 1.5s ease-in-out infinite alternate;
`;

const BookIcon = () => {
  return (
    <BookWrapper>
      <Book>
        <LeftPage />
        <FlippingPage />
      </Book>
    </BookWrapper>
  );
};

export default BookIcon;
