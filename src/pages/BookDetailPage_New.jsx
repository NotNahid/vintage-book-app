import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import BookshelfVisualizer from "../components/BookshelfVisualizer";
import PlaceholderCover from "../components/PlaceholderCover";
import { slugify } from "../utils/slugify";
import { useAppContext } from "../context/AppContext";

const PageContainer = styled.div`

  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
  overflow: hidden;


`;

const DetailGrid = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 64rem; /* max-w-4xl */
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem; /* gap-8 */
  align-items: start;


  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const MainBookCard = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(4px);
  padding: 1.5rem; /* p-6 */
  border-radius: 1rem; /* rounded-2xl */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media (min-width: 1024px) {
    grid-column: span 2 / span 2;
  }
`;

const BookCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem; /* gap-6 */

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

const CoverWrapper = styled.div`
  flex-shrink: 0;
`;

const BookCover = styled.img`
  width: 100%;
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
  border: 4px solid white;

  @media (min-width: 640px) {
    width: 10rem; /* sm:w-40 */
  }
`;

const BookDetails = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2.25rem; /* text-4xl */
  font-weight: 800;
  color: #1f2937; /* text-gray-800 */
  letter-spacing: -0.025em; /* tracking-tight */
`;

const Author = styled.p`
  margin-top: 0.5rem; /* mt-2 */
  font-size: 1.125rem; /* text-lg */
  color: #4b5563; /* text-gray-600 */
`;

const InfoSection = styled.div`
  margin-top: 1.5rem; /* mt-6 */
  font-size: 0.875rem; /* text-sm */
  color: #374151; /* text-gray-700 */

  & > div:not(:last-child) {
    margin-bottom: 0.75rem; /* space-y-3 */
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom-width: 1px;
  padding-bottom: 0.5rem; /* pb-2 */
`;

const InfoLabel = styled.span`
  color: #6b7280; /* text-gray-500 */
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarSection = styled.div`
  flex: 1;
  width: 100%;

  @media (min-width: 768px) {
    flex: initial;
  }
`;

const BookshelfWrapper = styled.div`
  flex-shrink: 0;
  margin-top: -4rem;
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

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.3rem 0.6rem;
  }
`;

const LocationCard = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(4px);
  padding: 0.25rem; /* p-4 */
  border-radius: 1rem; /* rounded-2xl */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const LocationText = styled.p`
  font-size: 0.875rem; /* text-sm */
  color: #4b5563; /* text-gray-600 */
`;

const LocationNumber = styled.p`
  font-size: 2rem; /* text-7xl */
  font-weight: 700;
  color: #1f2937; /* text-gray-800 */
`;

const BookDetailPage = () => {
  const { books, toggleBookDetailPageVersion } = useAppContext();
  const { id } = useParams();
  const { t } = useTranslation();
  const book = books.find((b) => slugify(b["Book Serial"] || "") === id);

  if (!book) {
    return <div>{t("bookDetail.notFound")}</div>;
  }

  const isAvailable = book.Availability && book.Availability.toLowerCase() === "true";

  return (
    <PageContainer>
      <button onClick={toggleBookDetailPageVersion} style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, background: 'white', padding: '0.5rem', borderRadius: '5px' }}>
        Switch to Classic View
      </button>
      <DetailGrid>
        <MainBookCard>
          <BookCardContent>
            <CoverWrapper>
              {book["Cover URL"] ? (
                <BookCover
                  alt={`Cover of ${book.Title}`}
                  src={book["Cover URL"]}
                />
              ) : (
                <PlaceholderCover title={book.Title} />
              )}
            </CoverWrapper>
            <BookDetails>
              <Title>{book.Title.toUpperCase()}</Title>
              <Author>{book.Author}</Author>
              <InfoSection>
                <InfoRow>
                  <InfoLabel>Department</InfoLabel>
                  <span>{book.Department}</span>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>ISBN</InfoLabel>
                  <span>{book.ISBN}</span>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Book Serial</InfoLabel>
                  <span>{book["Book Serial"]}</span>
                </InfoRow>
                <InfoRow>
                  <InfoLabel>Year</InfoLabel>
                  <span>{book.Year}</span>
                </InfoRow>
                {book.Publisher && (
                  <InfoRow>
                    <InfoLabel>Publisher</InfoLabel>
                    <span>{book.Publisher}</span>
                  </InfoRow>
                )}
              </InfoSection>
            </BookDetails>
          </BookCardContent>
        </MainBookCard>
        <SidebarContainer>
          <SidebarSection>
            <AvailabilityBadge $available={isAvailable}>
              {isAvailable ? "Available in Library" : "Not available in library"}
            </AvailabilityBadge>
            <LocationCard>
              <LocationText>{book['Shelf Location']}</LocationText>
            </LocationCard>
          </SidebarSection>
          <BookshelfWrapper>
            <BookshelfVisualizer location={book["Shelf Location"]} />
          </BookshelfWrapper>
        </SidebarContainer>
      </DetailGrid>
    </PageContainer>
  );
};

export default BookDetailPage;