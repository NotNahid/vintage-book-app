import React from 'react';
import styled, { keyframes } from 'styled-components';

const bookFlip = keyframes`
  0% { transform: rotateY(0deg); }
  20% { transform: rotateY(-180deg); }
  100% { transform: rotateY(-180deg); }
`;

const SpinnerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
`;

const Book = styled.div`
  width: 100px;
  height: 150px;
  position: relative;
  perspective: 1500px;
`;

const Page = styled.div`
  width: 50px;
  height: 150px;
  position: absolute;
  top: 0;
  right: 0;
  background: #f3f3f3;
  transform-origin: left;
  transform-style: preserve-3d;
  animation: ${bookFlip} 2s infinite;
`;

const Cover = styled.div`
  width: 50px;
  height: 150px;
  position: absolute;
  top: 0;
  left: 0;
  background: #3498db;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const Spine = styled.div`
  width: 10px;
  height: 150px;
  background: #2980b9;
  position: absolute;
  top: 0;
  left: 45px;
  z-index: -1;
`;

const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <Book>
        <Cover />
        <Spine />
        <Page />
        <Page style={{ animationDelay: '0.1s' }} />
        <Page style={{ animationDelay: '0.2s' }} />
      </Book>
    </SpinnerContainer>
  );
};

export default LoadingSpinner;
