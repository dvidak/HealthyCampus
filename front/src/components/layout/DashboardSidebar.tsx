import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
} from '@material-ui/core';
import { useEffect, useMemo, useState } from 'react';
import {
  Activity as ActivityIcon,
  Archive as ArchiveIcon,
  LogIn as LogInIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
} from 'react-feather';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Role, User } from '../../models/User';
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
    href: '/app/universities',
    icon: ArchiveIcon,
    title: 'Universities',
    roles: [Role.ADMIN],
  },
  {
    href: '/app/activity',
    icon: ActivityIcon,
    title: 'Activities',
    roles: [Role.PROFESOR],
  },
  {
    href: '/app/activity-types',
    icon: ActivityIcon,
    title: 'ActivityTypes',
    roles: [Role.PROFESOR, Role.ADMIN],
  },
  {
    href: '/app/activities',
    icon: ActivityIcon,
    title: 'All activities',
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
    roles: [Role.STUDENT],
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

  const location = useLocation();
  const items = useMemo(() => getItems(role, isLoggedIn), [isLoggedIn, role]);

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
