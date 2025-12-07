import React from 'react';
import TwitterIcon from '../assets/icons/TwitterIcon.svg?react';
import FacebookIcon from '../assets/icons/FacebookIcon.svg?react';
import InstagramIcon from '../assets/icons/InstagramIcon.svg?react';
import GoodreadsIcon from '../assets/icons/GoodreadsIcon.svg?react';
import GithubIcon from '../assets/icons/GithubIcon.svg?react';
import PinterestIcon from '../assets/icons/PinterestIcon.svg?react';
import MailIcon from '../assets/icons/MailIcon.svg?react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-4xl mx-auto text-center py-10 mt-16 md:mt-24">
      <div className="flex justify-center items-center space-x-6 mt-4">
        {/* Social Icons */}
        <a href="https://x.com/notnahid" title="Follow on Twitter" target="_blank" rel="noopener noreferrer" aria-label="Follow on Twitter" className="w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-all duration-300 bg-white/80 dark:bg-gray-800/80 hover:scale-110">
          <TwitterIcon />
        </a>
        <a href="https://www.facebook.com/notnahid" title="Follow on Facebook" target="_blank" rel="noopener noreferrer" aria-label="Follow on Facebook" className="w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-all duration-300 bg-white/80 dark:bg-gray-800/80 hover:scale-110">
          <FacebookIcon />
        </a>
        <a href="https://www.instagram.com/notnahid.me" title="Follow on Instagram" target="_blank" rel="noopener noreferrer" aria-label="Follow on Instagram" className="w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-all duration-300 bg-white/80 dark:bg-gray-800/80 hover:scale-110">
          <InstagramIcon />
        </a>
        <a href="https://www.goodreads.com/notnahid" title="Follow on Goodreads" target="_blank" rel="noopener noreferrer" aria-label="Follow on Goodreads" className="w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-all duration-300 bg-white/80 dark:bg-gray-800/80 hover:scale-110">
          <GoodreadsIcon />
        </a>
        <a href="https://github.com/notnahid" title="Follow on Github" target="_blank" rel="noopener noreferrer" aria-label="Follow on Github" className="w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-all duration-300 bg-white/80 dark:bg-gray-800/80 hover:scale-110">
          <GithubIcon />
        </a>
        <a href="https://www.pinterest.com/not_nahid/" title="Follow on Pinterest" target="_blank" rel="noopener noreferrer" aria-label="Follow on Pinterest" className="w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-all duration-300 bg-white/80 dark:bg-gray-800/80 hover:scale-110">
          <PinterestIcon />
        </a>
        <a href="mailto:nahidul.live@gmail.com" title="Send an email" aria-label="Send an email" className="w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-all duration-300 bg-white/80 dark:bg-gray-800/80 hover:scale-110">
          <MailIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;