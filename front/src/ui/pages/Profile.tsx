import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography,
} from '@material-ui/core';
import HouseIcon from '@material-ui/icons/House';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import React, { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import { User } from '../../models/User';
import userService from '../../services/user';
import { fitbitOAuthUrl } from '../shared/const';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Profile = () => {
	const size = useWindowSize();
	const [user, setUser] = useState<User | undefined>(undefined);

	useEffect(() => {
		async function fetchUser() {
			const fetchedUser = await userService.getUserById();
			setUser(fetchedUser);
		}

		fetchUser();
	}, []);

	const handleFitbitLogin = () => {
		const popUpHeight = 570;
		const popupWidht = 520;
		const popUpTop = (size.height - popUpHeight) / 2;
		const popUpLeft = (size.width - popupWidht) / 2;
		let url = fitbitOAuthUrl + localStorage.getItem('token');
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
		<Card className="profile-card">
			<CardActionArea>
				<CardContent>
					<Typography color="secondary" variant="h5" className="card-data">
						<PersonIcon /> {user?.firstName} {user?.lastName}
					</Typography>
					<br></br>
					<Typography className="card-data">
						<EmailIcon color="secondary" /> {user?.email}
					</Typography>
					<Typography className="card-data">
						<HouseIcon color="secondary" /> {user?.userUnit?.unit?.name}
					</Typography>
					{user?.fitbit?.fitbitId && (
						<Typography className="card-data">
							<CheckCircleIcon color="secondary" /> Connected to fitbit
						</Typography>
					)}
				</CardContent>
			</CardActionArea>
			{!user?.fitbit.fitbitId && (
				<CardActions>
					<Button color="secondary" onClick={handleFitbitLogin}>
						Connect to FitBit
					</Button>
				</CardActions>
			)}
		</Card>
	);
};

export default Profile;
