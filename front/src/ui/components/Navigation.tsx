import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import React, { useEffect, useState } from 'react';
import { useMedia } from 'react-use';

import classNames from 'classnames';
import NavigationMenu from './NavigationMenu';

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
		<div
			className={classNames('navigation-container', {
				top: !isVisible,
			})}
		>
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
			{isVisible && <NavigationMenu onNavItemClick={onNavItemClick} />}
		</div>
	);
};

export default Navigation;
