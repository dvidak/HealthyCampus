import { AppBar, Box, Hidden, IconButton, Toolbar } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/auth';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }: any) => {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    authService.logout();
    navigate('/login', { replace: true });
  };

  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <IconButton color="secondary">HC</IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton onClick={onLogoutClick} color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;
