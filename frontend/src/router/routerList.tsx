import { Navigate, Outlet } from 'react-router-dom';
import Agendamento from '../pages/Agendamento';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import isAuthenticatedOutput from '../services/auth/dto/isAuthenticatedOutput';

const routes = (input: isAuthenticatedOutput) => [
  {
    path: '/app',
    name: 'App',
    element: input.isLogged ? <Outlet /> : <Navigate to="/" />, 
    children: [
      {
        path: '/admin',
        name: 'Admin',
        element: input.isAdmin ? <Outlet /> : <Navigate to="/app/user/agendamento" />,
        children: [ 
          {
            path: '/dashboard',
            name: 'Dashboard',
            element: <Dashboard />
          },
          {
            path: '/*',
            name: 'Dashboard',
            element: <Navigate to="/dashboard" />
          },
        ]
      },
      {
        path: '/user',
        name: 'User',
        element: !input.isAdmin ? <Outlet /> : <Navigate to="/app/admin/dashboard" />,
        children: [ 
          {
            path: '/agendamento',
            name: 'Agendamento',
            element: <Agendamento />
          },
          {
            path: '/*',
            name: 'agendamento',
            element: <Navigate to="/agendamento" />
          },
        ]
      },
      {
        path: '/',
        element: <Navigate to="/app/admin/dashboard" />
      },
      {
        path: '/*',
        element: <Navigate to="/app/admin/dashboard" />
      },
    ]
  },
  {
    path: '/',
    name: 'App',
    element: !input.isLogged ? <Outlet /> : <Navigate to="/app" />,
    children: [
      {
        path: '/',
        name: 'Login',
        element: <Login />
      },
      {
        path: '/register',
        name: 'Register',
        element: <Register />
      },
      {
        path: '/*',
        name: 'Login',
        element: <Navigate to="/" />
      },

    ],
  },
];

export default routes;