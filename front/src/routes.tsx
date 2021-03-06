import React from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import Home from './pages/Home';
import ActivityType from './pages/ActivityType';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UniversityPage from './pages/University';
import Profile from './pages/Profile';
import UsersPage from './pages/Users';
import { Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ActivityPage from './pages/Activity';
import CreateActivityPage from './pages/CreateActivity';
import ActivitiesByUnitForStudent from './pages/ActivitiesByUnitForStudent';
import ActivityDetailsForProfesor from './pages/ActivityDetailsForProfesor';
import CreateStudentActivity from './pages/CreateStudentActivity';
import ActivityStatisticForStudent from './pages/ActivityStatisticForStudent';
import ConnectedActivities from './pages/ConnectedActivities';
import Dashboard from './pages/Dashboard';

const routes = (isLoggedIn: boolean) => [
  {
    path: '/app',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'home', element: <Home /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'activity', element: <ActivityPage /> },
      { path: 'activity/all', element: <ActivitiesByUnitForStudent /> },
      { path: 'activity/connected', element: <ConnectedActivities /> },
      { path: 'activity/create', element: <CreateActivityPage /> },
      {
        path: 'activity/create/:id',
        element: <CreateStudentActivity />,
      },
      {
        path: 'student-activity/details/:id',
        element: <ActivityStatisticForStudent />,
      },
      { path: 'activity/details/:id', element: <ActivityDetailsForProfesor /> },
      { path: 'types', element: <ActivityType /> },
      { path: 'universities', element: <UniversityPage /> },
      { path: 'profile', element: <Profile /> },
      { path: 'users', element: <UsersPage /> },
    ],
  },
  {
    path: '/',
    element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/home" />,
    children: [
      { path: '', element: <Login /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <SignUp /> },
    ],
  },
];

export default routes;
