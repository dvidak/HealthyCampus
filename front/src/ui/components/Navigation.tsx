import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import React, { useEffect, useState } from 'react';
import { useMedia } from 'react-use';
import NavigationItem from './NavigationItem';
import { navItems } from '../shared/navItems';

// TODO: Refresh on login
const Navigation = () => {
	const isLoggedIn = Boolean(localStorage.getItem('username'));
	const isMobile = useMedia('(max-width: 767px)');
	const [isVisible, setIsVisible] = useState(true);

	useEffect(() => {
		if (isMobile) {
			setIsVisible(false);
		} else {
			setIsVisible(true);
		}
	}, [isMobile]);

	const onClick = () => {
		setIsVisible(!isVisible);
	};

	const onNavItemClick = () => {
		if (isMobile) {
			setIsVisible(false);
		}
	};

	return (
		<div className="navigation-container">
			{!isVisible && (
				<IconButton color="secondary" onClick={onClick} aria-label="open-menu">
					<MenuIcon />
				</IconButton>
			)}
			{isVisible && isMobile && (
				<IconButton color="secondary" onClick={onClick} aria-label="close-menu">
					<ClearIcon />
				</IconButton>
			)}
			{isVisible && (
				<div className={`navigation`}>
					{isLoggedIn &&
						navItems
							.filter((navItem) => !navItem.public)
							.map((navItem) => {
								return (
									<NavigationItem
										onClick={onNavItemClick}
										navItem={navItem}
									></NavigationItem>
								);
							})}
					{!isLoggedIn &&
						navItems
							.filter((navItem) => navItem.public)
							.map((navItem) => {
								return (
									<NavigationItem
										onClick={onNavItemClick}
										navItem={navItem}
									></NavigationItem>
								);
							})}
				</div>
			)}
		</div>
	);
};

export default Navigation;
