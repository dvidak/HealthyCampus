import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface ProtectedRouteProps {
	children?: React.ReactNode;
	component?: any;
	roles?: any;
	exact?: boolean;
	path: string;
}

export const ProtectedRoute = ({
	children,
	component,
	roles,
	...routeProps
}: ProtectedRouteProps) => {
	const isLoggedIn = localStorage.getItem('token');
	const role = localStorage.getItem('role');

	if (!isLoggedIn) {
		return <Redirect to="/login" />;
	}

	if (roles && roles.indexOf(role) === -1) {
		return <Redirect to="/" />;
	}

	return (
		<Route {...routeProps} exact component={component}>
			{children}
		</Route>
	);
};
