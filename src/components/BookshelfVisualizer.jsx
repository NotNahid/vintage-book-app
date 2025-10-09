import React from 'react';
import styled, { keyframes } from 'styled-components';

const bookshelfWrapper = keyframes`
  perspective: 1200px;
`;

const BookshelfContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const ShelfSign = styled.div`
  position: absolute;
  top: -40px;
  background-color: #2e4732;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 5px;
  font-size: 1.8rem;
  font-weight: 600;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
`;

const Bookshelf = styled.div`
  width: 380px;
  height: 580px;
  background: linear-gradient(100deg, #5a7a50 0%, #6a8a60 50%, #556a58 100%);
  border: 12px solid #2e4732;
  border-bottom-width: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 0;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3), inset 0 0 25px rgba(0,0,0,0.4);
  position: relative;
`;

const Shelf = styled.div`
  height: 14%;
  background-color: #4a6a50;
  margin: 0 10px;
  display: flex;
  align-items: flex-end;
  padding: 0 10px;
  box-shadow: inset 0 8px 8px -4px rgba(0,0,0,0.5), inset 0 -5px 5px -3px rgba(0,0,0,0.3);
  border-bottom: 2px solid #2a3d2e;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  ${({ active }) => active && `
    border: 2px solid #ffdd40;
    box-shadow: 0 0 10px #ffdd40, inset 0 8px 8px -4px rgba(0,0,0,0.5), inset 0 -5px 5px -3px rgba(0,0,0,0.3);
  `}
`;

const Book = styled.div`
  height: 90%;
  width: 20px;
  margin-right: 2px;
  border-radius: 2px 2px 0 0;
  position: relative;
  box-shadow: 3px -2px 8px rgba(0,0,0,0.3), inset 2px 2px 2px rgba(255,255,255,0.1);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: white;
  font-size: 8px;
  font-weight: 600;
  transition: transform 0.2s ease-out;
  transform: translateZ(2px);

  &:hover {
    transform: translateY(-10px) translateZ(15px) rotate(-2deg);
    z-index: 10;
  }

  &.highlighted {
    box-shadow: 0 0 20px 5px #ffdd40, 3px -2px 8px rgba(0,0,0,0.3), inset 2px 2px 2px rgba(255,255,255,0.1);
    transform: translateY(-5px) translateZ(10px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 2px;
    right: 2px;
    bottom: 0;
    background-image: linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.1) 5%, transparent 5%, transparent 10%, rgba(255,255,255,0.1) 10%, rgba(255,255,255,0.1) 15%, transparent 15%);
  }

  &.plain::before {
    display: none;
  }

  &.title-box::after {
    content: '';
    position: absolute;
    top: 20%;
    left: 3px;
    right: 3px;
    height: 25%;
    background: rgba(0,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.2);
  }
`;

const bookClasses = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'c11', 'c12'];
const bookModifiers = ['book-tall', 'book-short', 'book-thick', 'book-thin', 'lean-left', 'lean-right', 'plain', 'title-box'];

const generateRandomBook = (key) => {
  const randomClass = bookClasses[Math.floor(Math.random() * bookClasses.length)];
  const randomModifier = bookModifiers[Math.floor(Math.random() * bookModifiers.length)];
  return <Book key={key} className={`${randomClass} ${randomModifier}`} />;
};

const BookshelfVisualizer = ({ location }) => {
  let shelfNum = null;
  let rowLetter = null;
  let position = null;
  let rowIndex = null;

  if (location) {
    const parts = location.split('-');
    if (parts.length === 3) {
      [shelfNum, rowLetter, position] = parts;
      const rowMap = {
        'A': 0,
        'B': 1,
        'C': 2,
        'D': 3,
        'E': 4,
        'F': 5,
      };
      rowIndex = rowLetter ? rowMap[rowLetter.toUpperCase()] : null;
    } else {
      const shelfMatch = location.match(/Shelf No: (\d+)/);
      if (shelfMatch) {
        shelfNum = shelfMatch[1];
      }
      const rowMatch = location.match(/(\w+) Row/);
      if (rowMatch) {
        const rowStr = rowMatch[1].toUpperCase();
        const rowMap = {
          'FIRST': 0,
          'SECOND': 1,
          'THIRD': 2,
          'FOURTH': 3,
          'FIFTH': 4,
          'SIXTH': 5,
        };
        rowIndex = rowMap[rowStr];
      }
    }
  }

  const shelves = Array.from({ length: 6 }, (_, shelfIndex) => {
    const books = [];
    const numBooks = Math.floor(Math.random() * 5) + 10; // 10 to 14 books

    for (let i = 0; i < numBooks; i++) {
      if (shelfIndex === rowIndex && i === parseInt(position) - 1) {
        books.push(<Book key={i} className="c1 highlighted" />);
      } else {
        books.push(generateRandomBook(i));
      }
    }
    return <Shelf key={shelfIndex} active={shelfIndex === rowIndex}>{books}</Shelf>;
  });

  return (
    <BookshelfContainer style={{ perspective: '1200px' }}>
      <Bookshelf style={{ transform: 'scale(0.5)' }}>
          {shelfNum && <ShelfSign>Shelf No: {shelfNum}</ShelfSign>}
          {shelves}
      </Bookshelf>
    </BookshelfContainer>
  );
};

export default BookshelfVisualizer;