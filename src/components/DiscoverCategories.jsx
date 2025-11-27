import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';

// Import all category icons
import LaptopIcon from './icons/LaptopIcon';
import FlaskIcon from './icons/FlaskIcon';
import LiteratureIcon from './icons/LiteratureIcon';
import CliortaringIcon from './icons/CliortaringIcon';
import EoppartureIcon from './icons/EoppartureIcon';
import PaletteIcon from './icons/PaletteIcon';
import EngineeringIcon from './icons/EngineeringIcon';
import ScrollIcon from './icons/ScrollIcon';
import BusinessIcon from './icons/BusinessIcon';
import ChemistryIcon from './icons/ChemistryIcon';
import CivilEngIcon from './icons/CivilEngIcon';
import CseIcon from './icons/CseIcon';
import EconomicsIcon from './icons/EconomicsIcon';
import EeeIcon from './icons/EeeIcon';
import EnglishIcon from './icons/EnglishIcon';
import IpeIcon from './icons/IpeIcon';
import LawIcon from './icons/LawIcon';
import MathIcon from './icons/MathIcon';
import MeIcon from './icons/MeIcon';
import PhysicsIcon from './icons/PhysicsIcon';
import TextileIcon from './icons/TextileIcon';
import TourismIcon from './icons/TourismIcon';

const CategoryGrid = styled(motion.section)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem; /* gap-4 in tailwind */
  margin-bottom: 2rem; /* Added for spacing from next section */

  @media (min-width: 769px) {
    display: none; /* Hide on desktop */
  }
`;

const CategoryCard = styled(motion.div)`
  background: linear-gradient(145deg, ${({ bgColor }) => bgColor || 'rgba(255, 255, 255, 0.1)'}, ${({ theme }) => theme.backgroundSecondary});
  padding: 1rem; /* p-4 in tailwind */
  border-radius: 0.75rem; /* rounded-xl in tailwind */
  display: flex;
  align-items: center;
  gap: 0.75rem; /* space-x-3 in tailwind */
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const CategoryText = styled.span`
  font-weight: 600; /* font-semibold in tailwind */
  color: ${({ textColor }) => textColor || 'inherit'};
  font-size: 0.9rem;
`;

const categoryData = [
  { name: 'Business Administration (BBA/MBA)', slug: 'business-administration', icon: BusinessIcon, bgColor: '#F3F4F6', textColor: '#1F2937' },
  { name: 'Chemistry', slug: 'chemistry', icon: ChemistryIcon, bgColor: '#E0F7FA', textColor: '#006064' },
  { name: 'Civil Engineering (CE)', slug: 'civil-engineering', icon: CivilEngIcon, bgColor: '#E3F2FD', textColor: '#1565C0' },
  { name: 'Computer Science & Engineering (CSE)', slug: 'computer-science-engineering', icon: CseIcon, bgColor: '#E8F5E9', textColor: '#2E7D32' },
  { name: 'Economics', slug: 'economics', icon: EconomicsIcon, bgColor: '#FFF3E0', textColor: '#E65100' },
  { name: 'Electrical and Electronic Engineering (EEE)', slug: 'electrical-electronic-engineering', icon: EeeIcon, bgColor: '#FBE9E7', textColor: '#BF360C' },
  { name: 'English', slug: 'english', icon: EnglishIcon, bgColor: '#EDE7F6', textColor: '#4527A0' },
  { name: 'Industrial & Production Engineering (IPE)', slug: 'industrial-production-engineering', icon: IpeIcon, bgColor: '#FCE4EC', textColor: '#AD1457' },
  { name: 'Law (LLB/LLM)', slug: 'law', icon: LawIcon, bgColor: '#E0F2F7', textColor: '#006064' },
  { name: 'Mathematics', slug: 'mathematics', icon: MathIcon, bgColor: '#F3E5F5', textColor: '#6A1B9A' },
  { name: 'Mechanical Engineering (ME)', slug: 'mechanical-engineering', icon: MeIcon, bgColor: '#EFEBE9', textColor: '#4E342E' },
  { name: 'Physics', slug: 'physics', icon: PhysicsIcon, bgColor: '#E0F2F7', textColor: '#0288D1' },
  { name: 'Textile Engineering (TE)', slug: 'textile-engineering', icon: TextileIcon, bgColor: '#F1F8E9', textColor: '#558B2F' },
  { name: 'Tourism & Hospitality Management (BTHM)', slug: 'tourism-hospitality-management', icon: TourismIcon, bgColor: '#FFFDE7', textColor: '#F57F17' },
];

const DiscoverCategories = () => {
  const { t } = useTranslation();
  const { theme } = useAppContext(); // Access theme for dynamic icon colors

  const getIconColor = (defaultColor) => {
    // Use default color if provided, otherwise use theme's text color
    return defaultColor || theme.text;
  };

  return (
    <CategoryGrid
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
    >
      {categoryData.map((category) => {
        const IconComponent = category.icon;
        return (
          <Link to={`/departments/${category.slug}`} key={category.slug} style={{ textDecoration: 'none' }}>
            <CategoryCard
              bgColor={category.bgColor}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <IconComponent size={24} color={getIconColor(category.textColor)} />
              <CategoryText textColor={category.textColor}>{t(`department.${category.slug}`, category.name)}</CategoryText>
            </CategoryCard>
          </Link>
        );
      })}
    </CategoryGrid>
  );
};

export default DiscoverCategories;
