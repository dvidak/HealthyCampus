import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity as ActivityIcon,
  Archive as ArchiveIcon,
  LogIn as LogInIcon,
  LogOut as LogoutIcon,
  Monitor as MonitorIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  BarChart as BarChartIcon,
  Home as HomeIcon,
} from 'react-feather';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Role, User } from '../../models/User';
import authService from '../../services/auth';
import userService from '../../services/user';
import NavItem from './NavItem';

const items = [
  {
    href: '/login',
    icon: LogInIcon,
    title: 'Login',
    roles: [Role.NONE],
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Register',
    roles: [Role.NONE],
  },
  {
    href: '/app/home',
    icon: HomeIcon,
    title: 'Home',
    roles: [Role.PROFESSOR],
  },
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
    roles: [Role.STUDENT],
  },
  {
    href: '/app/universities',
    icon: ArchiveIcon,
    title: 'Universities',
    roles: [Role.ADMIN],
  },
  {
    href: '/app/activity',
    icon: ActivityIcon,
    title: 'Activities',
    roles: [Role.PROFESSOR],
  },
  {
    href: '/app/types',
    icon: ActivityIcon,
    title: 'ActivityTypes',
    roles: [Role.PROFESSOR, Role.ADMIN],
  },
  {
    href: '/app/activity/all',
    icon: ActivityIcon,
    title: 'Unit activities',
    roles: [Role.STUDENT],
  },
  {
    href: '/app/activity/connected',
    icon: MonitorIcon,
    title: 'My activities',
    roles: [Role.STUDENT],
  },
  {
    href: '/app/users',
    icon: UsersIcon,
    title: 'Users',
    roles: [Role.ADMIN],
  },
  {
    href: '/app/profile',
    icon: UserIcon,
    title: 'Profile',
    roles: [Role.STUDENT, Role.PROFESSOR],
  },
];

const getItems = (role: Role, isLoggedIn: boolean) =>
  items.filter((item) => item.roles.includes(role));
interface Props {
  onMobileClose: () => void;
  openMobile: boolean;
}

const DashboardSidebar = ({ onMobileClose, openMobile }: Props) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const [role, setRole] = useState<Role>(Role.NONE);

  const navigate = useNavigate();
  const location = useLocation();
  const items = useMemo(() => getItems(role, isLoggedIn), [isLoggedIn, role]);

  const onLogoutClick = () => {
    authService.logout();
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await userService.getUserById();
      setUser(fetchedUser);
      setRole(fetchedUser.role.roleName);
    }

    fetchUser();
  }, []);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2,
        }}
      >
        <Avatar
          component={RouterLink}
          src={user?.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64,
          }}
          to="/app/profile"
        />
        <Typography color="textPrimary" variant="h5">
          {user?.firstName}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user?.role.roleName}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          {isLoggedIn && (
            <Button
              onClick={onLogoutClick}
              sx={{
                color: 'text.secondary',
                fontWeight: 'medium',
                justifyContent: 'flex-start',
                letterSpacing: 0,
                py: 1.25,
                textTransform: 'none',
                width: '100%',
                '& svg': {
                  mr: 1,
                },
              }}
            >
              {<LogoutIcon size="20" />}
              <span>Logout</span>
            </Button>
          )}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256,
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)',
            },
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default DashboardSidebar;
