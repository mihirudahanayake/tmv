export const Roles = {
  SITE_ADMIN: 'siteAdmin',
  SUPER_ADMIN: 'superAdmin',
  DEPARTMENT_HEAD: 'departmentHead',
  SUPERVISOR_TO: 'supervisorTO',
  MEMBER: 'member'
};

export const SITE_ADMIN_EMAIL = 'mihirumilanka11@gmail.com';

export const normalizeRole = (userDoc) => {
  const email = (userDoc?.email || '').toString().toLowerCase();
  if (email && email === SITE_ADMIN_EMAIL) return Roles.SITE_ADMIN;

  const role = userDoc?.role;
  if (role === Roles.SITE_ADMIN) return Roles.SITE_ADMIN;
  if (role === Roles.SUPER_ADMIN) return Roles.SUPER_ADMIN;
  if (role === Roles.DEPARTMENT_HEAD) return Roles.DEPARTMENT_HEAD;
  if (role === Roles.SUPERVISOR_TO) return Roles.SUPERVISOR_TO;
  if (role === Roles.MEMBER) return Roles.MEMBER;

  // Backward compatibility with old field
  if (userDoc?.userType === 'admin') return Roles.DEPARTMENT_HEAD;
  if (userDoc?.userType === 'superAdmin') return Roles.SUPER_ADMIN;
  if (userDoc?.userType === 'supervisor' || userDoc?.userType === 'supervisorTO') {
    return Roles.SUPERVISOR_TO;
  }
  return Roles.MEMBER;
};

export const isUserTO = (userDoc) => {
  if (!userDoc) return false;
  if (userDoc?.isTO === true) return true;
  const role = normalizeRole(userDoc);
  return role === Roles.SUPERVISOR_TO;
};

export const getManagedDepartments = (userDoc) => {
  const role = normalizeRole(userDoc);
  if (role !== Roles.DEPARTMENT_HEAD) return [];

  const managed = Array.isArray(userDoc?.managedDepartments)
    ? userDoc.managedDepartments.filter(Boolean)
    : [];
  if (managed.length) return managed;

  if (userDoc?.firstPriority) return [userDoc.firstPriority];

  const fromDepartments = Array.isArray(userDoc?.departments) ? userDoc.departments.filter(Boolean) : [];
  if (fromDepartments.length) return [fromDepartments[0]];

  return [];
};

export const canEdit = (userDoc) => {
  const role = normalizeRole(userDoc);
  return (
    role === Roles.DEPARTMENT_HEAD ||
    role === Roles.SUPER_ADMIN ||
    role === Roles.SITE_ADMIN
  );
};

export const canManageUser = (manager, target) => {
  const role = normalizeRole(manager);
  if (role === Roles.SITE_ADMIN || role === Roles.SUPER_ADMIN) return true;
  if (role !== Roles.DEPARTMENT_HEAD || normalizeRole(target) !== Roles.MEMBER) return false;

  const managedDepartments = getManagedDepartments(manager);
  const targetDepartments = Array.isArray(target?.departments)
    ? target.departments.filter(Boolean)
    : target?.department
      ? [target.department]
      : [];

  return managedDepartments.some((department) => targetDepartments.includes(department));
};
