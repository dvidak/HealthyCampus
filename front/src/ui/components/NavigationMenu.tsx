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
			{navItems[role].map((navItem: NavItem) => {
				return (
					<NavigationItem
						key={navItem.label}
						onClick={onNavItemClick}
						navItem={navItem}
					></NavigationItem>
				);
			})}
		</div>
	);
};

export default NavigationMenu;
