import React from 'react';
import { useAppContext } from '../context/AppContext';
import BookDetailPageNew from './BookDetailPage_New';
import BookDetailPageOld from './BookDetailPage_Old';

const BookDetailPage = () => {
  const { useNewBookDetailPage } = useAppContext();

  return useNewBookDetailPage ? <BookDetailPageNew /> : <BookDetailPageOld />;
};

export default BookDetailPage;
