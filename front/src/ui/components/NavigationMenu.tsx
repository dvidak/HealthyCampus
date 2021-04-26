import { IconButton } from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import React from 'react';
import { Role } from '../../models/User';
import { NavItem, navItems } from '../shared/navItems';
import NavigationItem from './NavigationItem';

interface Props {
  onNavItemClick: () => void;
  onLogoutClick: () => void;
}

const NavigationMenu = ({ onNavItemClick, onLogoutClick }: Props) => {
  const role = ((localStorage.getItem('role') as unknown) as Role) || Role.NONE;

  return (
    <div className="navigation">
      {navItems.map((navItem: NavItem) =>
        navItem.roles.includes(role) ? (
          <NavigationItem
            key={navItem.label}
            onClick={onNavItemClick}
            navItem={navItem}
          ></NavigationItem>
        ) : null,
      )}
      {role !== Role.NONE ? (
        <IconButton
          color="secondary"
          onClick={onLogoutClick}
          className="logout-button"
        >
          <MeetingRoomIcon />
        </IconButton>
      ) : null}
    </div>
  );
};

export default NavigationMenu;
