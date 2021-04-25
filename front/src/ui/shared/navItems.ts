import { FunctionComponent } from 'react';
import { Role } from '../../models/User';
import Admin from '../pages/Admin';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import SignUp from '../pages/SignUp';
import Unit from '../pages/Unit';
import University from '../pages/University';

export interface NavItem {
	route: string;
	label: string;
	component: FunctionComponent;
	roles: Role[];
}

export const navItems = [
	{
		route: '/admin',
		label: 'Admin',
		component: Admin,
		roles: [Role.ADMIN],
	},
	{
		route: '/unit',
		label: 'Unit',
		component: Unit,
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
