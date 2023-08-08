import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Outlet, Navigate } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { user } = useContext(UserContext);

  if (user.loading) return <div>Loading...</div>;

  return user.data ? <Outlet /> : <Navigate to='/' />;
};
