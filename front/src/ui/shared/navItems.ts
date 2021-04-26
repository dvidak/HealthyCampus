import { FunctionComponent } from 'react';
import { Role } from '../../models/User';
import ActivityType from '../pages/ActivityType';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import SignUp from '../pages/SignUp';
import University from '../pages/University';
import Users from '../pages/Users';

export interface NavItem {
  route: string;
  label: string;
  component: FunctionComponent;
  roles: Role[];
}

export const navItems = [
  {
    route: '/users',
    label: 'Users',
    component: Users,
    roles: [Role.ADMIN],
  },
  {
    route: '/university',
    label: 'University',
    component: University,
    roles: [Role.ADMIN],
  },
  {
    route: '/',
    label: 'Home',
    component: Home,
    public: false,
    roles: [Role.PROFESOR, Role.STUDENT],
  },
  {
    route: '/activity-type',
    label: 'Activity type',
    component: ActivityType,
    public: false,
    roles: [Role.PROFESOR],
  },
  {
    route: '/profile',
    label: 'Profile',
    component: Profile,
    public: false,
    roles: [Role.PROFESOR, Role.STUDENT],
  },
  {
    route: '/login',
    label: 'Login',
    component: Login,
    roles: [Role.NONE],
  },
  {
    route: '/signUp',
    label: 'Sign up',
    component: SignUp,
    roles: [Role.NONE],
  },
];
