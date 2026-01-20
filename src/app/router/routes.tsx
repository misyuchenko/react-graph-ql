import { Navigate } from 'react-router-dom';
import { AuthLayout, MainLayout } from '@/app/layouts';
import LoginPage from '@/pages/login/LoginPage';
import RootPage from '@/pages/root/RootPage';
import ProtectedRoute from './ProtectedRoute';

const routes = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <RootPage />,
      },
    ],
  },
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];

export default routes;
