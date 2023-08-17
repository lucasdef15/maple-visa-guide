import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Outlet, Navigate } from 'react-router-dom';
import Loader from '../components/loaders/Loader';

export const ProtectedRoute = () => {
  const { user } = useContext(UserContext);

  if (user.loading) return <Loader />;

  return user.data?.isMember ? <Outlet /> : <Navigate to='/' />;
};
