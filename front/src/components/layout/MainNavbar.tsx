import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import React from 'react';

interface Props {}

const MainNavbar = (props: Props) => (
  <AppBar elevation={0} {...props}>
    <Toolbar sx={{ height: 64 }}>
      <IconButton color="secondary">HC</IconButton>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
