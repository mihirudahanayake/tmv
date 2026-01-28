export const Roles = {
  SUPER_ADMIN: 'superAdmin',
  DEPARTMENT_HEAD: 'departmentHead',
  MEMBER: 'member'
};

export const normalizeRole = (userDoc) => {
  const role = userDoc?.role;
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

export const canEdit = (userDoc) => normalizeRole(userDoc) === Roles.DEPARTMENT_HEAD;
