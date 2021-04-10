import { Button } from '@material-ui/core';
import React from 'react';
import { useWindowSize } from 'react-use';
import { fitbitOAuthUrl } from '../shared/const';

const Profile = () => {
	const size = useWindowSize();
	const token = localStorage.getItem('token');

	const handleFitbitLogin = () => {
		const popUpHeight = 570;
		const popupWidht = 520;
		const popUpTop = (size.height - popUpHeight) / 2;
		const popUpLeft = (size.width - popupWidht) / 2;
		let url = fitbitOAuthUrl + token;
		let win = window.open(
			url,
			'_blank',
			`location=yes,height=${popUpHeight},width=${popupWidht},top=${popUpTop},left=${popUpLeft},scrollbars=yes,status=yes`,
		);

		const checkConnect = setInterval(function () {
			if (!win || !win.closed) return;
			clearInterval(checkConnect);
			window.location.reload();
		}, 100);
	};

	return (
		<div>
			profile
			<Button color="secondary" onClick={handleFitbitLogin}>
				Fitbit
			</Button>
		</div>
	);
};

export default Profile;
