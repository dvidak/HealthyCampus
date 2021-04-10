import { FunctionComponent } from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import SignUp from '../pages/SignUp';

export interface NavItem {
	route: string;
	label: string;
	component: FunctionComponent;
	public: boolean;
}

export const navItems: NavItem[] = [
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
	{
		route: '/login',
		label: 'Login',
		component: Login,
		public: true,
	},
	{
		route: '/signUp',
		label: 'Sign up',
		component: SignUp,
		public: true,
	},
];
