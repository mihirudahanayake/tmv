import { Navigate } from 'react-router-dom';
import { useUserProfile } from '../hooks/useUserProfile';
import { isUserTO, Roles } from '../utils/authz';

const RoleRoute = ({ allowRoles, children, redirectTo = '/home' }) => {
  const { user, profile, loading } = useUserProfile();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  const role = profile?.role || 'member';
  const allow = Array.isArray(allowRoles) ? allowRoles : [];
  const okBase = allow.includes(role);
  const okTO = allow.includes(Roles.SUPERVISOR_TO) && isUserTO(profile);
  const ok = okBase || okTO;

  if (!ok) return <Navigate to={redirectTo} replace />;

  return children;
};

export default RoleRoute;
