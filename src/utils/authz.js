export const Roles = {
  SITE_ADMIN: 'siteAdmin',
  SUPER_ADMIN: 'superAdmin',
  DEPARTMENT_HEAD: 'departmentHead',
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
  if (role === Roles.MEMBER) return Roles.MEMBER;

  // Backward compatibility with old field
  if (userDoc?.userType === 'admin') return Roles.DEPARTMENT_HEAD;
  if (userDoc?.userType === 'superAdmin') return Roles.SUPER_ADMIN;
  return Roles.MEMBER;
};

export const getManagedDepartments = (userDoc) => {
  const role = normalizeRole(userDoc);
  if (role !== Roles.DEPARTMENT_HEAD) return [];

  const managed = Array.isArray(userDoc?.managedDepartments)
    ? userDoc.managedDepartments.filter(Boolean)
    : [];

  if (managed.length) return managed;

  // Sensible fallback for legacy admins
  const fromFirst = userDoc?.firstPriority ? [userDoc.firstPriority] : [];
  if (fromFirst.length) return fromFirst;

  const fromDepartments = Array.isArray(userDoc?.departments) ? userDoc.departments.filter(Boolean) : [];
  if (fromDepartments.length) return [fromDepartments[0]];

  return ['videography'];
};

export const canEdit = (userDoc) => {
  const role = normalizeRole(userDoc);
  return role === Roles.DEPARTMENT_HEAD || role === Roles.SITE_ADMIN;
};
