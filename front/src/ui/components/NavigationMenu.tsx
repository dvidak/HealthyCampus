import NavigationItem from './NavigationItem';
import { NavItem, navItems } from '../shared/navItems';
import { Role } from '../../models/User';

interface Props {
  onNavItemClick: () => void;
}

const NavigationMenu = ({ onNavItemClick }: Props) => {
  const role = ((localStorage.getItem('role') as unknown) as Role) || Role.NONE;

  return (
    <div className={`navigation`}>
      {navItems.map((navItem: NavItem) =>
        navItem.roles.includes(role) ? (
          <NavigationItem
            key={navItem.label}
            onClick={onNavItemClick}
            navItem={navItem}
          ></NavigationItem>
        ) : null,
      )}
    </div>
  );
};

export default NavigationMenu;
