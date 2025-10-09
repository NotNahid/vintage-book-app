import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import BookCard from "../components/BookCard";

const AuthorDetailPageContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
`;

const BooksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const NoResults = styled.div`
  text-align: center;
  margin-top: 4rem;
  font-size: 1.2rem;
`;

const AuthorDetailPage = () => {
  const { t } = useTranslation();
  const { setAuthor, filteredAuthorBooks } = useAppContext();
  const { authorName } = useParams();

  useEffect(() => {
    setAuthor(authorName);
  }, [authorName, setAuthor]);

  return (
    <AuthorDetailPageContainer>
      <h1>{authorName}</h1>
      {filteredAuthorBooks.length > 0 ? (
        <BooksGrid>
          {filteredAuthorBooks.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </BooksGrid>
      ) : (
        <NoResults>No books found</NoResults>
      )}
    </AuthorDetailPageContainer>
  );
};

export default AuthorDetailPage;
