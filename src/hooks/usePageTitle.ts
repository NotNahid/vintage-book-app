import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Define a type for the title map
interface TitleMap {
  [key: string]: string;
}

const defaultTitleMap: TitleMap = {
  '/': 'Home - My Portfolio',
  '/about': 'About Me - My Portfolio',
  '/contact': 'Contact Me - My Portfolio',
  '/gallery': 'Gallery - My Portfolio',
  '/thank-you': 'Thank You - My Portfolio',
};

const usePageTitle = (titleMap: TitleMap = defaultTitleMap, defaultPageTitle: string = 'My Portfolio') => {
  const location = useLocation();

  useEffect(() => {
    const currentTitle = titleMap[location.pathname] || defaultPageTitle;
    document.title = currentTitle;
  }, [location.pathname, titleMap, defaultPageTitle]);
};

export default usePageTitle;
