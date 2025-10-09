
import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter, HashRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
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

const HomePage = React.lazy(() => import("./pages/HomePage"));
const BookDetailPage = React.lazy(() => import("./pages/BookDetailPage"));
const DepartmentsPage = React.lazy(() => import("./pages/DepartmentsPage"));
const DepartmentPage = React.lazy(() => import("./pages/DepartmentPage"));
const AllBooksPage = React.lazy(() => import("./pages/AllBooksPage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const AuthorsPage = React.lazy(() => import("./pages/AuthorsPage"));
const AuthorDetailPage = React.lazy(() => import("./pages/AuthorDetailPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));


const StickyContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  min-height: 160px; /* Reserve space to prevent layout shift */
`;

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.name === 'dark' ? '#000' : 'url("https://i.pinimg.com/736x/fb/8a/3d/fb8a3d4087aa411fc510c8bab307d157.jpg") no-repeat center center fixed'};
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    color: ${({ theme }) => theme.text};
    font-family: 'Inter', sans-serif;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Poppins', sans-serif;
  }

  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.75rem;
    }

    h3 {
      font-size: 1.5rem;
    }
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
      if (event.key === '/') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
      if (event.altKey && event.key === 'l') {
        event.preventDefault();
        setIsQuickNavOpen(prev => !prev);
      }
      if (event.altKey && event.key === 'c') {
        event.preventDefault();
        handleSearch('', location.pathname);
      }
      if (event.key === 'Escape') {
        setIsQuickNavOpen(false);
        setIsShortcutListOpen(false);
      }
      if (event.altKey && event.key === 'd') {
        event.preventDefault();
        navigate('/departments');
      }
      if (event.altKey && event.key === 'a') {
        event.preventDefault();
        navigate('/books');
      }
      if (event.altKey && event.key === 'u') {
        event.preventDefault();
        navigate('/authors');
      }
      if (event.altKey && event.key === 'h') {
        event.preventDefault();
        navigate('/');
      }
      if (event.altKey && event.key === '?') {
        event.preventDefault();
        navigate('/about');
      }
      if (event.altKey && event.key === 't') {
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
      <Suspense fallback={null}>
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
  const { theme } = useAppContext();

  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <GlobalStyle />
      <ScrollToTop />
      <AppContent />
    </ThemeProvider>
  );
}

function App() {
  const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;
  return (
    <Router>
      <AppProvider>
        <ThemedApp />
      </AppProvider>
    </Router>
  );
}

export default App;