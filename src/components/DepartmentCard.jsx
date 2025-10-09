import React from "react";
import styled, { css } from "styled-components";
import Icon from "./Icon";

const Card = styled.div`
  background-color: ${(props) => props.$backgroundColor};
  color: white;
  padding: 1rem;
  border-radius: 30px;
  aspect-ratio: 1 / 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s;
  position: relative;
  text-align: center;
  overflow: hidden;

  @media (hover: hover) {
    &:hover {
      transform: scale(1.05);
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.15;
    pointer-events: none;
  }

  ${({ $isChip }) =>
    $isChip &&
    css`
      @media (max-width: 768px) {
        width: 100%;
        height: 100%;
        aspect-ratio: unset;
      }
    `}
`;

const DepartmentName = styled.div`
  font-size: 1rem;
  font-weight: bold;
  z-index: 1;
  margin-top: 0.5rem;

  ${({ $isChip }) =>
    $isChip &&
    css`
      @media (max-width: 768px) {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 0; /* Fix for flexbox truncation */
      }
    `}
`;

const DepartmentCard = ({ department, isChip }) => {
  return (
    <Card $backgroundColor={department.backgroundColor} $isChip={isChip}>
      <Icon name={department.icon} size={48} />
      <DepartmentName $isChip={isChip}>{department.name}</DepartmentName>
    </Card>
  );
};

export default DepartmentCard;
