import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "../theme";
import PlaceholderCover from "./PlaceholderCover";
import { slugify } from "../utils/slugify";

const Card = styled.div`
  background-color: ${({ theme }) => theme.body};
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  @media (hover: hover) {
    &:hover {
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    height: 100%;
  }
`;

const CoverContainer = styled.div`
  width: 100%;
  height: 200px;
  @media (max-width: 768px) {
    height: 120px;
  }
`;

const BookCover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BookInfo = styled.div`
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.8rem;
  }
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Allow up to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-height: 2.4rem; /* 2 lines * 1.2rem */
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    min-height: 1.8rem; /* 2 lines * 0.9rem */
  }
`;

const Author = styled.p`
  font-size: 0.9rem;
  margin: 0.5rem 0;

  @media (max-width: 768px) {
    font-size: 0.7rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Department = styled.p`
  font-size: 0.8rem;
  font-style: italic;
  margin: 0;
`;

const Availability = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${(props) => (props.$available ? theme.colors.available : theme.colors.checkedOut)};
`;

const BookCard = ({ book }) => {
  const isAvailable = book.Availability && book.Availability.toLowerCase() === 'true';
  const title = book.Title || "No Title";
  const author = book.Author || "No Author";
  const department = book.Department || "No Department";
  const coverUrl = book['Cover URL'];
  const bookSerial = book['Book Serial'] || "";
  const bookId = slugify(bookSerial);

  return (
    <Link to={`/book/${bookId}`} style={{ textDecoration: "none", color: "inherit" }}>
      <Card>
        <CoverContainer>
          {coverUrl ? (
            <BookCover
              alt={`Cover of ${title}`}
              src={coverUrl}
              loading="lazy"
            />
          ) : (
            <PlaceholderCover title={title} />
          )}
        </CoverContainer>
        <BookInfo>
          <Title>{title}</Title>
          <Author>{author}</Author>
          <Department>{department}</Department>
          <Availability $available={isAvailable}>
            {isAvailable ? "Available" : "Checked Out"}
          </Availability>
        </BookInfo>
      </Card>
    </Link>
  );
};

export default BookCard;
