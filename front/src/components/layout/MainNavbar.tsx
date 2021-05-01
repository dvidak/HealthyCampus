import { AppBar, Toolbar } from '@material-ui/core';

interface Props {}

const MainNavbar = (props: Props) => (
  <AppBar elevation={0} {...props}>
    <Toolbar sx={{ height: 64 }}>
      <span>Logo</span>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
