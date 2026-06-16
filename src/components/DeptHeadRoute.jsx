import RoleRoute from './RoleRoute';

const DeptHeadRoute = ({ children }) => (
  <RoleRoute allowRoles={['departmentHead', 'superAdmin', 'siteAdmin']} redirectTo="/home">
    {children}
  </RoleRoute>
);

export default DeptHeadRoute;
