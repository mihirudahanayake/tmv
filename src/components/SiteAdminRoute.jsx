import RoleRoute from './RoleRoute';

const SiteAdminRoute = ({ children }) => (
  <RoleRoute allowRoles={['siteAdmin']} redirectTo="/home">
    {children}
  </RoleRoute>
);

export default SiteAdminRoute;
