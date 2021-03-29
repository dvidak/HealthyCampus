import { FunctionComponent } from 'react';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

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
		public: true,
	},
	{
		route: '/login',
		label: 'Login',
		component: Login,
		public: true,
	},
	{
		route: '/register',
		label: 'Register',
		component: Register,
		public: true,
	},
];
