import RoleRoute from './RoleRoute';

const DeptHeadRoute = ({ children }) => (
  <RoleRoute allowRoles={['departmentHead']} redirectTo="/home">
    {children}
  </RoleRoute>
);

export default DeptHeadRoute;
