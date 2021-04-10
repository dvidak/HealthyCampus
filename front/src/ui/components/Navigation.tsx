import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import React, { useEffect, useState } from 'react';
import { useMedia } from 'react-use';
import NavigationItem from './NavigationItem';
import { navItems } from '../shared/navItems';

const Navigation = () => {
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
					{Boolean(localStorage.getItem('token')) &&
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
					{!Boolean(localStorage.getItem('token')) &&
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
