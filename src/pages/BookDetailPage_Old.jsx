import React from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ShelfVisualizer from "../components/ShelfVisualizer";
import PlaceholderCover from "../components/PlaceholderCover";
import BookCard from "../components/BookCard";
import { slugify } from "../utils/slugify";
import { useAppContext } from "../context/AppContext";
import Icon from "../components/Icon";

const DetailContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  padding: 3rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 1.5rem;
  }
`;

const CoverContainer = styled.div`
  width: 100%;
  height: 450px;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;

  @media (max-width: 768px) {
    height: 150px;
  }
`;

const BookCover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BookInfoContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  padding: 2.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin: 0;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const AuthorNamesWrapper = styled.div`
  margin: 0.5rem 0 1.5rem;
  font-weight: 400;

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const StyledAuthorLink = styled(Link)`
  font-size: 1.3rem;
  cursor: pointer;
  color: ${({ theme }) => theme.textMuted};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  margin-top: 1.2rem;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.textMuted};
  display: flex;
  align-items: center;
  gap: 8px;
  text-align: right;
  padding-right: 5px;
`;

const AvailabilityBadge = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  color: white;
  background-color: ${(props) => (props.$available ? props.theme.colors.available : props.theme.colors.checkedOut)};
  margin-top: 1.2rem;
`;

const ShelfLocationCard = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1.2rem;
  font-size: 1.1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.8rem;
    margin-top: 0.8rem;
  }
`;

const RecommendationsContainer = styled.div`
  margin-top: 4rem;
  padding: 0 4rem;

  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

const RecommendationsTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const RecommendationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const BookDetailPageOld = () => {
  const { books, toggleBookDetailPageVersion } = useAppContext();
  const { id } = useParams();
  const { t } = useTranslation();
  const book = books.find((b) => slugify(b["Book Serial"] || "") === id);

  if (!book) {
    return <div>{t("bookDetail.notFound")}</div>;
  }

  const isAvailable = book.Availability && book.Availability.toLowerCase() === "true";

  const recommendedByAuthor = books.filter(
    (b) => b.Author === book.Author && slugify(b["Book Serial"] || "") !== id
  ).slice(0, 5);

  const recommendedByDepartment = books.filter(
    (b) => b.Department === book.Department && slugify(b["Book Serial"] || "") !== id
  ).slice(0, 5);

  const recommendedBooks = [...new Set([...recommendedByAuthor, ...recommendedByDepartment])];

  return (
    <>
      <button onClick={toggleBookDetailPageVersion} style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'white', padding: '0.5rem', borderRadius: '5px' }}>
        Switch to New View
      </button>
      <DetailContainer>
        <CoverContainer>
          {book["Cover URL"] ? (
            <BookCover
              alt={`Cover of ${book.Title}`}
              src={book["Cover URL"]}
            />
          ) : (
            <PlaceholderCover title={book.Title} />
          )}
        </CoverContainer>
        <BookInfoContainer>
          <Title>{book.Title}</Title>
          {book.Author && (
            <AuthorNamesWrapper>
              {book.Author.split(",").map((authorName, index) => (
                <StyledAuthorLink key={index} to={`/authors/${authorName.trim()}`}>
                  {authorName.trim()}
                  {index < book.Author.split(",").length - 1 && <span>, </span>}
                </StyledAuthorLink>
              ))}
            </AuthorNamesWrapper>
          )}
          <InfoRow>
            <InfoLabel><Icon name="department" size={16} />{t("bookDetail.department")}:</InfoLabel>
            <span>{book.Department}</span>
          </InfoRow>
          <InfoRow>
            <InfoLabel><Icon name="isbn" size={16} />{t("bookDetail.isbn")}:</InfoLabel>
            <span>{book.ISBN}</span>
          </InfoRow>
          <InfoRow>
            <InfoLabel><Icon name="serial" size={16} />{t("bookDetail.serial")}:</InfoLabel>
            <span>{book["Book Serial"]}</span>
          </InfoRow>
          <InfoRow>
            <InfoLabel><Icon name="year" size={16} />{t("bookDetail.year")}:</InfoLabel>
            <span>{book.Year}</span>
          </InfoRow>
          {book.Publisher && (
            <InfoRow>
              <InfoLabel>Publisher</InfoLabel>
              <span>{book.Publisher}</span>
            </InfoRow>
          )}
          <AvailabilityBadge $available={isAvailable}>
            {isAvailable ? "Available in Library" : "Not available in library"}
          </AvailabilityBadge>
          <ShelfLocationCard>
            <Icon name="shelf" size={20} />
            {book["Shelf Location"]}
          </ShelfLocationCard>
          <ShelfVisualizer location={book["Shelf Location"]} />
        </BookInfoContainer>
      </DetailContainer>
      {recommendedBooks.length > 0 && (
        <RecommendationsContainer>
          <RecommendationsTitle>{t("bookDetail.recommendations")}</RecommendationsTitle>
          <RecommendationsGrid>
            {recommendedBooks.map((recBook, index) => (
              <BookCard key={`${recBook["Book Serial"]}-${index}`} book={recBook} />
            ))}
          </RecommendationsGrid>
        </RecommendationsContainer>
      )}
    </>
  );
};

export default BookDetailPageOld;
