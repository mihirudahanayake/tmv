import { Navigate } from 'react-router-dom';
import { useUserProfile } from '../hooks/useUserProfile';

const RoleRoute = ({ allowRoles, children, redirectTo = '/home' }) => {
  const { user, profile, loading } = useUserProfile();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const role = profile?.role || 'member';
  const ok = Array.isArray(allowRoles) ? allowRoles.includes(role) : false;

  if (!ok) return <Navigate to={redirectTo} replace />;

  return children;
};

export default RoleRoute;
