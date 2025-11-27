import React, { createContext, useState, useContext, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchBooks } from '../services/bookService';
import { departments } from '../data/books';
import useDebounce from '../hooks/useDebounce';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [searchTerms, setSearchTerms] = useState({});
  const [isQuickNavOpen, setIsQuickNavOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchHistory, setSearchHistory] = useState(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      return Array.isArray(parsedHistory) ? parsedHistory : [];
    }
    return [];
  });

  const [allAuthors, setAllAuthors] = useState([]);
  const [authorSearchTerm, setAuthorSearchTerm] = useState('');
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [authorSearchHistory, setAuthorSearchHistory] = useState(() => {
    const savedHistory = localStorage.getItem('authorSearchHistory');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      return Array.isArray(parsedHistory) ? parsedHistory : [];
    }
    return [];
  });

  const [departmentSearchTerm, setDepartmentSearchTerm] = useState('');
  const [filteredDepartments, setFilteredDepartments] = useState(departments);
  const [departmentSearchHistory, setDepartmentSearchHistory] = useState(() => {
    const savedHistory = localStorage.getItem('departmentSearchHistory');
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      return Array.isArray(parsedHistory) ? parsedHistory : [];
    }
    return [];
  });

  const [departmentBooks, setDepartmentBooks] = useState([]);
  const [filteredDepartmentBooks, setFilteredDepartmentBooks] = useState([]);

  const [authorBooks, setAuthorBooks] = useState([]);
  const [filteredAuthorBooks, setFilteredAuthorBooks] = useState([]);

  const [useNewBookDetailPage, setUseNewBookDetailPage] = useState(true);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const toggleBookDetailPageVersion = () => {
    setUseNewBookDetailPage(prev => !prev);
  };

  const debouncedSearchTerm = useDebounce(searchTerms[location.pathname], 500);
  const debouncedAuthorSearchTerm = useDebounce(authorSearchTerm, 500);
  const debouncedDepartmentSearchTerm = useDebounce(departmentSearchTerm, 500);

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  const [isAnimationEnabled, setIsAnimationEnabled] = useState(true);

  const toggleAnimation = () => {
    setIsAnimationEnabled(prev => !prev);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'bn' : 'en';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    localStorage.setItem('authorSearchHistory', JSON.stringify(authorSearchHistory));
  }, [authorSearchHistory]);

  useEffect(() => {
    localStorage.setItem('departmentSearchHistory', JSON.stringify(departmentSearchHistory));
  }, [departmentSearchHistory]);

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      localStorage.setItem('language', lng);
    };
    i18n.on('languageChanged', handleLanguageChanged);
    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, [i18n]);

  useEffect(() => {
    fetchBooks()
      .then((data) => {
        setBooks(data);
        setFilteredBooks(data);
        setLoading(false);

        const authorData = data.reduce((acc, book) => {
          const authorString = book.Author;
          if (authorString) {
            const authorList = authorString.split(',').map(author => author.trim());
            authorList.forEach(author => {
              if (author) {
                const lowerCaseAuthor = author.toLowerCase();
                if (acc[lowerCaseAuthor]) {
                  acc[lowerCaseAuthor].count++;
                } else {
                  acc[lowerCaseAuthor] = { name: author, count: 1 };
                }
              }
            });
          }
          return acc;
        }, {});

        const authors = Object.values(authorData);

        setAllAuthors(authors);
        setFilteredAuthors(authors);
        setIsDataLoaded(true);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      addSearchToHistory(debouncedSearchTerm, filteredBooks);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (debouncedAuthorSearchTerm && !authorSearchHistory.includes(debouncedAuthorSearchTerm)) {
      setAuthorSearchHistory([debouncedAuthorSearchTerm, ...authorSearchHistory].slice(0, 5));
    }
  }, [debouncedAuthorSearchTerm]);

  useEffect(() => {
    if (debouncedDepartmentSearchTerm && !departmentSearchHistory.includes(debouncedDepartmentSearchTerm)) {
      setDepartmentSearchHistory([debouncedDepartmentSearchTerm, ...departmentSearchHistory].slice(0, 5));
    }
  }, [debouncedDepartmentSearchTerm]);

  const [authorShortcut, setAuthorShortcut] = useState(null);

  const addSearchToHistory = useCallback((term, books) => {
    if (term.trim() === '') return;

    const existingEntry = searchHistory.find(entry => entry.term === term);
    if (existingEntry) return;

    const firstResult = books[0];
    const newHistoryEntry = {
      term,
      cover: firstResult ? firstResult['Cover URL'] : null,
    };

    setSearchHistory([newHistoryEntry, ...searchHistory].slice(0, 5));
  }, [searchHistory]);

  const handleSearch = useCallback((term, path, saveImmediately = false) => {
    setSearchTerms(prevTerms => ({
      ...prevTerms,
      [path]: term,
    }));

    const searchTermLower = term.toLowerCase().trim().replace(/\s+/g, ' ');

    const authorMatch = books.find(book => book.Author.toLowerCase() === searchTermLower);
    if (authorMatch && authorMatch.Author) {
      setAuthorShortcut({ name: authorMatch.Author, slug: authorMatch.Author.replace(/\s+/g, '-').toLowerCase() });
    } else {
      setAuthorShortcut(null);
    }

    const filtered = books.filter((book) => {
      const title = (book.Title || '').toLowerCase().trim().replace(/\s+/g, ' ');
      const author = (book.Author || '').toLowerCase().trim().replace(/\s+/g, ' ');
      const isbn = (book.ISBN || '').toLowerCase().trim().replace(/\s+/g, ' ');

      return (
        title.includes(searchTermLower) ||
        author.includes(searchTermLower) ||
        isbn.includes(searchTermLower)
      );
    });

    setFilteredBooks(filtered);

    if (saveImmediately) {
      addSearchToHistory(term, filtered);
    }
  }, [books, addSearchToHistory]);

  const handleAuthorSearch = useCallback((term) => {
    setAuthorSearchTerm(term);
    const filtered = allAuthors.filter(author =>
      author.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredAuthors(filtered);
  }, [allAuthors]);

  const handleDepartmentSearch = useCallback((term) => {
    setDepartmentSearchTerm(term);
    const filtered = departments.filter(department =>
      department.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredDepartments(filtered);
  }, [departments]);

  const setDepartment = useCallback((departmentName) => {
    const booksInDept = books.filter(book => book.Department && book.Department.trim().toLowerCase() === departmentName.trim().toLowerCase());
    setDepartmentBooks(booksInDept);
    setFilteredDepartmentBooks(booksInDept);
  }, [books]);

  const handleSearchInDepartment = useCallback((term) => {
    const filtered = departmentBooks.filter((book) => {
      const searchTermLower = term.toLowerCase().trim().replace(/\s+/g, ' ');
      const title = (book.Title || '').toLowerCase().trim().replace(/\s+/g, ' ');
      const isbn = (book.ISBN || '').toLowerCase().trim().replace(/\s+/g, ' ');

      return (
        title.includes(searchTermLower) ||
        isbn.includes(searchTermLower)
      );
    });
    setFilteredDepartmentBooks(filtered);
  }, [departmentBooks]);

  const setAuthor = useCallback((authorName) => {
    const booksByAuthor = books.filter(book => {
      const authorString = book.Author;
      if (authorString) {
        const authorList = authorString.split(',').map(author => author.trim());
        return authorList.includes(authorName);
      }
      return false;
    });
    setAuthorBooks(booksByAuthor);
    setFilteredAuthorBooks(booksByAuthor);
  }, [books]);

  const handleSearchInAuthor = useCallback((term) => {
    const filtered = authorBooks.filter((book) => {
      const searchTermLower = term.toLowerCase().trim().replace(/\s+/g, ' ');
      const title = (book.Title || '').toLowerCase().trim().replace(/\s+/g, ' ');
      const isbn = (book.ISBN || '').toLowerCase().trim().replace(/\s+/g, ' ');

      return (
        title.includes(searchTermLower) ||
        isbn.includes(searchTermLower)
      );
    });
    setFilteredAuthorBooks(filtered);
  }, [authorBooks]);

  const clearSearchHistory = useCallback(() => {
    setSearchHistory([]);
  }, []);

  const removeAuthorSearchHistoryItem = useCallback((term) => {
    setAuthorSearchHistory(authorSearchHistory.filter(item => item !== term));
  }, [authorSearchHistory]);

  const removeDepartmentSearchHistoryItem = useCallback((term) => {
    setDepartmentSearchHistory(departmentSearchHistory.filter(item => item !== term));
  }, [departmentSearchHistory]);

  const removeSearchHistoryItem = useCallback((term) => {
    setSearchHistory(searchHistory.filter(item => item.term !== term));
  }, [searchHistory]);

  const getRecommendations = () => {
    if (searchHistory.length === 0) {
      return [];
    }

    const recentAuthors = searchHistory.map(item => {
      const book = books.find(b => b.Title === item.term);
      return book ? book.Author : null;
    }).filter(author => author);

    if (recentAuthors.length === 0) {
      return [];
    }

    const recommendedBooks = books.filter(book => 
      recentAuthors.includes(book.Author) && 
      !searchHistory.some(item => item.term === book.Title)
    );

    return recommendedBooks.slice(0, 5);
  };

  const [dropdownItems, setDropdownItems] = useState([]);

  const buildDropdownItems = () => {
    const recommendations = getRecommendations();
    const suggestions = filteredBooks.slice(0, 5);

    const allItems = [
      ...(authorShortcut ? [{...authorShortcut, type: 'shortcut'}] : []),
      ...suggestions.map(book => ({...book, type: 'suggestion'})),
      ...searchHistory.map(item => ({...item, type: 'history'})),
      ...recommendations.map(book => ({...book, type: 'recommendation'})),
    ];
    setDropdownItems(allItems);
  };

  useEffect(() => {
    buildDropdownItems();
  }, [searchHistory, filteredBooks, authorShortcut]);

  const value = {
    searchTerms,
    handleSearch,
    isQuickNavOpen,
    setIsQuickNavOpen,
    theme,
    setTheme,
    books,
    loading,
    error,
    filteredBooks,
    searchHistory,
    clearSearchHistory,
    removeSearchHistoryItem,
    getRecommendations,
    authorShortcut,
    dropdownItems,
    authorSearchTerm,
    handleAuthorSearch,
    filteredAuthors,
    authorSearchHistory,
    removeAuthorSearchHistoryItem,
    departmentSearchTerm,
    handleDepartmentSearch,
    filteredDepartments,
    departmentSearchHistory,
    removeDepartmentSearchHistoryItem,
    departmentBooks,
    filteredDepartmentBooks,
    setDepartment,
    handleSearchInDepartment,
    authorBooks,
    filteredAuthorBooks,
    setAuthor,
    handleSearchInAuthor,
    useNewBookDetailPage,
    toggleBookDetailPageVersion,
    isAnimationEnabled,
    toggleAnimation,
    t,
    i18n,
    toggleLanguage,
    isDataLoaded,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};