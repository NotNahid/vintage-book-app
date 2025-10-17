import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ThemeToggle from './ThemeToggle';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';

const FloatingNavContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  z-index: 1000;
`;

const FloatingButton = styled(motion.button)`
  width: 100px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;

  @media (max-width: 768px) {
    width: 80px;
    height: 30px;
    border-radius: 15px;
  }
`;

const SideMenu = styled(motion.div)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 200px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(6px);
  border-radius: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;

  @media (max-width: 768px) {
    width: 150px;
    padding: 15px;
  }
`;

const MenuItem = styled.div`
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, transform 0.2s ease-in-out;
  border-radius: 50px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const ControlButton = styled.button`
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: none;
  color: ${({ theme }) => theme.text};
  padding: 0.5rem 1rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 0;
    width: 30px;
    height: 30px;

    .text {
      display: none;
    }

    .icon {
      display: block;
    }
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke={props.color}
    strokeLinecap="round"
    {...props}
  />
);

const pages = [
  { name: 'nav.home', path: '/' },
  { name: 'nav.departments', path: '/departments' },
  { name: 'nav.allBooks', path: '/books' },
  { name: 'nav.authors', path: '/authors' },
  { name: 'nav.help', path: '/about' },
];

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;

const Hint = styled(motion.div)`
  position: absolute;
  top: 50%;
  right: 120px;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  white-space: nowrap;
  text-shadow: 0 1px 3px rgba(0,0,0,0.2);
`;

const DraggableMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({ right: '110px' });
  const [menuOffset, setMenuOffset] = useState(110);
  const [showHint, setShowHint] = useState(true);
  const constraintsRef = useRef(null);
  const navContainerRef = useRef(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const { t, i18n, toggleLanguage, isAnimationEnabled, toggleAnimation } = useAppContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 5000); // Hide hint after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMenuOffset(70);
      } else {
        setMenuOffset(110);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const updateMenuStyle = () => {
    if (navContainerRef.current) {
      const { x, width } = navContainerRef.current.getBoundingClientRect();
      if (x + width / 2 > window.innerWidth / 2) {
        setMenuStyle({ right: `${menuOffset}px` });
      } else {
        setMenuStyle({ left: `${menuOffset}px` });
      }
    }
  };

  const onDragEnd = () => {
    updateMenuStyle();
  };

  const handleMenuToggle = () => {
    setShowHint(false);
    updateMenuStyle();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <>
      {isMenuOpen && <Backdrop onPointerDown={() => setIsMenuOpen(false)} />}
      <motion.div
        ref={constraintsRef}
        style={{
          position: 'fixed',
          top: '16px',
          left: '32px',
          right: '32px',
          bottom: '16px',
          pointerEvents: 'none',
        }}
      />
      <FloatingNavContainer
        ref={navContainerRef}
        drag
        dragConstraints={constraintsRef}
        onDragEnd={onDragEnd}
      >
        <AnimatePresence>
          {showHint && (
            <Hint
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 80, scale: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              {t('misc.navigateHint')}
            </Hint>
          )}
        </AnimatePresence>
        <FloatingButton onClick={handleMenuToggle}>
          <svg width="23" height="23" viewBox="0 0 23 23">
            <Path
              color={theme.text}
              animate={isMenuOpen ? { d: "M 3 16.5 L 17 2.5" } : { d: "M 2 2.5 L 20 2.5" }}
            />
            <Path
              color={theme.text}
              d="M 2 9.423 L 20 9.423"
              animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.1 }}
            />
            <Path
              color={theme.text}
              animate={isMenuOpen ? { d: "M 3 2.5 L 17 16.346" } : { d: "M 2 16.346 L 20 16.346" }}
            />
          </svg>
        </FloatingButton>
        {isMenuOpen && (
          <SideMenu
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={menuStyle}
          >
            {pages.map((page) => (
              <MenuItem key={page.path} onClick={() => handleMenuItemClick(page.path)}>
                {t(page.name)}
              </MenuItem>
            ))}
            <ControlsContainer>
              <ControlButton onClick={toggleLanguage}>
                {i18n.language === 'en' ? 'BN' : 'EN'}
              </ControlButton>
              <ControlButton onClick={toggleAnimation}>
                <span className="icon">{isAnimationEnabled ? <PauseIcon size={16}/> : <PlayIcon size={16}/>}</span>
                <span className="text">{isAnimationEnabled ? "Pause" : "Play"}</span>
              </ControlButton>
              <ThemeToggle />
            </ControlsContainer>
          </SideMenu>
        )}
      </FloatingNavContainer>
    </>
  );
};

export default DraggableMenu;
