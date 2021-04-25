import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from '../shared/navItems';

interface Props {
  navItem: NavItem;
  onClick: () => void;
}

const NavigationItem = ({ navItem, onClick }: Props) => {
  return (
    <NavLink
      onClick={onClick}
      className="navigation-item"
      exact
      to={navItem.route}
    >
      {navItem.label}
    </NavLink>
  );
};

export default NavigationItem;
