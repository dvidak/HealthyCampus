import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Role } from '../../models/User';
import Layout from '../components/Layout';
import Admin from '../pages/Admin';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import SignUp from '../pages/SignUp';
import { ProtectedRoute } from './ProtectedRoute';

export function AppRouter() {
	return (
		<BrowserRouter>
			<Switch>
				<Layout>
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={SignUp} />
					<ProtectedRoute exact path="/" component={Home} />
					<ProtectedRoute exact path="/profile" component={Profile} />
					<ProtectedRoute
						path="/admin"
						roles={[Role.ADMIN]}
						component={Admin}
					/>
				</Layout>
			</Switch>
		</BrowserRouter>
	);
}
