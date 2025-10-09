import React from 'react';
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

const components = {
  BusinessIcon,
  ChemistryIcon,
  CivilEngIcon,
  CseIcon,
  EconomicsIcon,
  EeeIcon,
  EnglishIcon,
  IpeIcon,
  LawIcon,
  MathIcon,
  MeIcon,
  PhysicsIcon,
  TextileIcon,
  TourismIcon,
};

const Icon = ({ name, ...props }) => {
  const IconComponent = components[name];
  if (!IconComponent) {
    return null;
  }
  return <IconComponent {...props} />;
};

export default Icon;
