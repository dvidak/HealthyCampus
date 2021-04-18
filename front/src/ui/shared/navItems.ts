import { FunctionComponent } from 'react';
import { Role } from '../../models/User';
import Admin from '../pages/Admin';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import SignUp from '../pages/SignUp';

export interface NavItem {
	route: string;
	label: string;
	component: FunctionComponent;
}

export const navItems = {
	[Role.ADMIN]: [
		{
			route: '/admin',
			label: 'Admin',
			component: Admin,
		},
	],

	[Role.STUDENT]: [
		{
			route: '/',
			label: 'Home',
			component: Home,
			public: false,
		},
		{
			route: '/profile',
			label: 'Profile',
			component: Profile,
			public: false,
		},
	],
	[Role.PROFESOR]: [
		{
			route: '/profile',
			label: 'Profile',
			component: Profile,
		},
	],
	[Role.NONE]: [
		{
			route: '/login',
			label: 'Login',
			component: Login,
		},
		{
			route: '/signUp',
			label: 'Sign up',
			component: SignUp,
		},
	],
};
