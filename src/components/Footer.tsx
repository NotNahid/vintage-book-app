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
      <div className="flex justify-center items-center space-x-4 mt-4">
        {/* Social Icons */}
        <a href="https://x.com/notnahid" target="_blank" rel="noopener noreferrer" aria-label="Follow on Twitter" className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <TwitterIcon />
        </a>
        <a href="https://www.facebook.com/notnahid" target="_blank" rel="noopener noreferrer" aria-label="Follow on Facebook" className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <FacebookIcon />
        </a>
        <a href="https://www.instagram.com/notnahid.me" target="_blank" rel="noopener noreferrer" aria-label="Follow on Instagram" className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <InstagramIcon />
        </a>
        <a href="https://www.goodreads.com/notnahid" target="_blank" rel="noopener noreferrer" aria-label="Follow on Goodreads" className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <GoodreadsIcon />
        </a>
        <a href="https://github.com/notnahid" target="_blank" rel="noopener noreferrer" aria-label="Follow on Github" className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <GithubIcon />
        </a>
        <a href="https://www.pinterest.com/not_nahid/" target="_blank" rel="noopener noreferrer" aria-label="Follow on Pinterest" className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <PinterestIcon />
        </a>
        <a href="mailto:nahidul.live@gmail.com" aria-label="Send an email" className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <MailIcon />
        </a>
      </div>
    </footer>
  );
};

export default Footer;