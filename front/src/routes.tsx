import React from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import Admin from './pages/Admin';
import Home from './pages/Home';
import ActivityType from './pages/ActivityType';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UniversityPage from './pages/University';
import Profile from './pages/Profile';
import UsersPage from './pages/Users';
import { Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';

const routes = (isLoggedIn: boolean) => [
  {
    path: 'app',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'admin', element: <Admin /> },
      { path: 'home', element: <Home /> },
      { path: 'activity-types', element: <ActivityType /> },
      { path: 'universities', element: <UniversityPage /> },
      { path: 'profile', element: <Profile /> },
      { path: 'users', element: <UsersPage /> },
    ],
  },
  {
    path: '/',
    element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/home" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <SignUp /> },
    ],
  },
];

export default routes;