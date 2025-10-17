import React, { useState, useEffect, Suspense } from "react";
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { lightTheme, darkTheme, theme as commonTheme } from "./theme";
import { fetchBooks } from "./services/bookService";
import { AppProvider, useAppContext } from "./context/AppContext";
import Navbar from "./components/Navbar";
import QuickNav from "./components/QuickNav";
import ShortcutList from "./components/ShortcutList";
import DraggableMenu from "./components/DraggableMenu";
import ThemeToggle from "./components/ThemeToggle";
import styled from "styled-components";
import ScrollToTop from "./components/ScrollToTop";
import GoToTopButton from "./components/GoToTopButton";
import LoadingSpinner from "./components/LoadingSpinner";
import GlobalStyle from "./globalStyles";
import Iridescence from "./components/Iridescence";
import { departments } from "./data/books";
import { hexToRgb } from "./utils/color";

import { SHORTCUTS } from "./constants";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const BookDetailPage = React.lazy(() => import("./pages/BookDetailPage"));
const DepartmentsPage = React.lazy(() => import("./pages/DepartmentsPage"));
const DepartmentPage = React.lazy(() => import("./pages/DepartmentPage"));
const AllBooksPage = React.lazy(() => import("./pages/AllBooksPage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const AuthorsPage = React.lazy(() => import("./pages/AuthorsPage"));
const AuthorDetailPage = React.lazy(() => import("./pages/AuthorDetailPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  min-height: 160px; /* Reserve space to prevent layout shift */

  @media (max-width: 768px) {
    min-height: 80px;
  }
`;

const light = { ...lightTheme, ...commonTheme };
const dark = { ...darkTheme, ...commonTheme };

function AppContent() {
  const { isQuickNavOpen, setIsQuickNavOpen, searchInputRef, handleSearch } = useAppContext();
  const [isShortcutListOpen, setIsShortcutListOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > 100) {
            if (!isScrolled) {
              setIsScrolled(true);
            }
          } else if (currentScrollY < 50) {
            if (isScrolled) {
              setIsScrolled(false);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  useEffect(() => {
    if (isScrolled) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
  }, [isScrolled]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SHORTCUTS.SEARCH) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      if (event.altKey && event.key === SHORTCUTS.TOGGLE_QUICK_NAV) {
        event.preventDefault();
        setIsQuickNavOpen(prev => !prev);
      }
      if (event.altKey && event.key === SHORTCUTS.CLEAR_SEARCH) {
        event.preventDefault();
        handleSearch('', location.pathname);
      }
      if (event.key === SHORTCUTS.ESCAPE) {
        setIsQuickNavOpen(false);
        setIsShortcutListOpen(false);
      }
      if (event.altKey && event.key === SHORTCUTS.DEPARTMENTS) {
        event.preventDefault();
        navigate('/departments');
      }
      if (event.altKey && event.key === SHORTCUTS.ALL_BOOKS) {
        event.preventDefault();
        navigate('/books');
      }
      if (event.altKey && event.key === SHORTCUTS.AUTHORS) {
        event.preventDefault();
        navigate('/authors');
      }
      if (event.altKey && event.key === SHORTCUTS.HOME) {
        event.preventDefault();
        navigate('/');
      }
      if (event.altKey && event.key === SHORTCUTS.ABOUT) {
        event.preventDefault();
        navigate('/about');
      }
      if (event.altKey && event.key === SHORTCUTS.TOGGLE_SHORTCUT_LIST) {
        event.preventDefault();
        setIsShortcutListOpen(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, searchInputRef, setIsQuickNavOpen, handleSearch, location.pathname]);



  return (
    <>
      <DraggableMenu />
      {isQuickNavOpen && <QuickNav />}
      {isShortcutListOpen && <ShortcutList setIsShortcutListOpen={setIsShortcutListOpen} />}
      <StickyContainer>
        <Navbar isScrolled={isScrolled} />
      </StickyContainer>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<BookDetailPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/departments/:departmentSlug" element={<DepartmentPage />} />
          <Route path="/books" element={<AllBooksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/authors" element={<AuthorsPage />} />
          <Route path="/authors/:authorName" element={<AuthorDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <GoToTopButton />
    </>
  );
}

function ThemedApp() {
  const { theme, isAnimationEnabled } = useAppContext();
  const location = useLocation();
  const [animationColor, setAnimationColor] = useState([1, 1, 1]);

  useEffect(() => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    let newColor = '#FFFFFF';

    if (pathSegments[0] === 'departments' && pathSegments[1]) {
      const dept = departments.find(d => d.slug === pathSegments[1]);
      if (dept) {
        newColor = dept.animationColor;
      }
    }

    setAnimationColor(hexToRgb(newColor));
  }, [location, theme]);

  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <GlobalStyle />
      {theme === 'light' && (
        <BackgroundContainer>
          <Iridescence color={animationColor} speed={isAnimationEnabled ? 0.2 : 0} amplitude={0.05} mouseReact={false} />
        </BackgroundContainer>
      )}
      <ScrollToTop />
      <AppContent />
    </ThemeProvider>
  );
}

function App() {
  return (
    <Router>
      <AppProvider>
        <ThemedApp />
      </AppProvider>
    </Router>
  );
}

export default App;