import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import MobileHeader from "./MobileHeader";
import { useAppContext } from "../context/AppContext";

const Nav = styled.nav`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  transition: none;
  background-color: transparent;
  flex-direction: column;

  /* User preference: Do not show a background or shadow on the header when scrolling. */

  @media (max-width: 768px) {
    padding: 0;
    height: auto;
    width: 100%;
  }
`;

const NavContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  width: 100%;

  body.scrolled & {
    flex-direction: row;
    justify-content: center;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const DesktopNavLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    gap: 8px;
    position: relative;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: ${({ theme }) => theme.text};
    font-weight: bold;
    border-radius: 50px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const glowPulse = keyframes`
  0% { box-shadow: 0 0 5px 0px rgba(253, 160, 133, 0.7); }
  50% { box-shadow: 0 0 15px 5px rgba(253, 160, 133, 0.7); }
  100% { box-shadow: 0 0 5px 0px rgba(253, 160, 133, 0.7); }
`;

const DotIndicator = styled(motion.div)`
  width: 8px;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${glowPulse} 2s infinite;
`;

const dotVariants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.3, 1],
    transition: { duration: 0.3 }
  }
};

const ControlsContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
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

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const DesktopOnly = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileOnly = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`;

const Navbar = ({ isScrolled }) => {
  const location = useLocation();
  const { t, i18n, toggleLanguage, isAnimationEnabled, toggleAnimation } = useAppContext();

  const showSearchBar = !['/about'].includes(location.pathname);

  const navLinks = [
    { to: "/", label: t('nav.home') },
    { to: "/departments", label: t('nav.departments') },
    { to: "/books", label: t('nav.allBooks') },
    { to: "/authors", label: t('nav.authors') },
    { to: "/about", label: t('nav.help') },
  ];

  return (
    <Nav>
      <MobileOnly>
        <MobileHeader isScrolled={isScrolled} />
      </MobileOnly>
      <DesktopOnly>
        <NavContent>
          <DesktopNavLinks>
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to}>
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <DotIndicator
                        layoutId="dot-indicator"
                        variants={dotVariants}
                        initial="initial"
                        animate={isActive ? "animate" : "initial"}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </>
                )}
              </NavLink>
            ))}
          </DesktopNavLinks>
          {showSearchBar && <SearchBar isScrolled={isScrolled} />}
        </NavContent>
        <ControlsContainer>
          <ControlButton onClick={toggleLanguage}>
            {i18n.language === 'en' ? 'BN' : 'EN'}
          </ControlButton>
          <ControlButton onClick={toggleAnimation}>
            {isAnimationEnabled ? "Pause" : "Play"}
          </ControlButton>
          <ThemeToggle />
        </ControlsContainer>
      </DesktopOnly>
    </Nav>
  );
};

export default Navbar;
