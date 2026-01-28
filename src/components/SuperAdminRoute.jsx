import RoleRoute from './RoleRoute';

const SuperAdminRoute = ({ children }) => (
  <RoleRoute allowRoles={['superAdmin']} redirectTo="/home">
    {children}
  </RoleRoute>
);

export default SuperAdminRoute;
