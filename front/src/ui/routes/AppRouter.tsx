import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Role } from '../../models/User';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import SignUp from '../pages/SignUp';
import University from '../pages/University';
import Users from '../pages/Users';
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
            path="/users"
            roles={[Role.ADMIN]}
            component={Users}
          />
          <ProtectedRoute
            path="/university"
            roles={[Role.ADMIN]}
            component={University}
          />
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}
