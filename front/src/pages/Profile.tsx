import { Box, Container, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useWindowSize } from 'react-use';
import UserProfile from '../components/UserProfile';
import UserProfileDetails from '../components/UserProfileDetails';
import { User } from '../models/User';
import userService from '../services/user';
import { fitbitOAuthUrl } from '../shared/const';

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
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            {user && (
              <UserProfile user={user} handleFitbitLogin={handleFitbitLogin} />
            )}
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            {user && <UserProfileDetails user={user} />}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
