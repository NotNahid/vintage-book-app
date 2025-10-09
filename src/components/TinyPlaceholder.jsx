import React from 'react';
import styled from 'styled-components';

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%);
  border-radius: 2px;
`;

const TinyPlaceholder = () => {
  return <Placeholder />;
};

export default TinyPlaceholder;