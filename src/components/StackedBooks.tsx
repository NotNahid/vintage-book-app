import React from 'react';

const StackedBooks: React.FC = () => {
  return (
    <div className="flex flex-col justify-end h-full w-32 md:w-40 mx-2 my-4 md:my-0">
      <div className="stacked-book book-1"></div>
      <div className="stacked-book book-2"></div>
      <div className="stacked-book book-3"></div>
    </div>
  );
};

export default StackedBooks;
