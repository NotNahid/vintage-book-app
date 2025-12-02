import { useEffect } from 'react';

export const useFavicon = (href: string) => {
  useEffect(() => {
    const link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'shortcut icon';
    link.href = href;
    document.getElementsByTagName('head')[0].appendChild(link);
  }, [href]);
};
