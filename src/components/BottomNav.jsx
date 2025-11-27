import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import HomeIcon from './icons/HomeIcon';
import GroupsIcon from './icons/GroupsIcon';
import AllBooksIcon from './icons/AllBooksIcon';
import PeopleIcon from './icons/PeopleIcon';
import HelpIcon from './icons/HelpIcon';
import { useAppContext } from '../context/AppContext';

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (min-width: 769px) {
    display: none; /* Hide on desktop */
  }
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.75rem;
  font-weight: 500;
  transition: color 0.2s ease-in-out;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  svg {
    margin-bottom: 0.25rem;
  }
`;

const BottomNav = () => {
  const { t } = useAppContext();

  return (
    <NavContainer>
      <NavItem to="/" end>
        <HomeIcon size={24} />
        <span>{t('nav.home')}</span>
      </NavItem>
      <NavItem to="/departments">
        <GroupsIcon size={24} />
        <span>{t('nav.departments')}</span>
      </NavItem>
      <NavItem to="/books">
        <AllBooksIcon size={24} />
        <span>{t('nav.allBooks')}</span>
      </NavItem>
      <NavItem to="/authors">
        <PeopleIcon size={24} />
        <span>{t('nav.authors')}</span>
      </NavItem>
      <NavItem to="/about">
        <HelpIcon size={24} />
        <span>{t('nav.help')}</span>
      </NavItem>
    </NavContainer>
  );
};

export default BottomNav;