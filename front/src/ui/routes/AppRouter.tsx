import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRouter() {
	return (
		<BrowserRouter>
			<Navigation></Navigation>
			<ProtectedRoute exact path="/" component={Home} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/signUp" component={SignUp} />
		</BrowserRouter>
	);
}
