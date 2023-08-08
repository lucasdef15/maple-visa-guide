import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Outlet, Navigate } from 'react-router-dom';

export const ProtectedRoute = () => {
  const [state] = useContext(UserContext);

  if (state.loading) return <div>Loading...</div>;

  return state.data ? <Outlet /> : <Navigate to='/' />;
};
