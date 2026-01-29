export const getWorkRolesForDepartment = (department) => {
  switch (department) {
    case 'videography':
      return ['videography', 'editing'];
    case 'photography':
      return ['photography', 'editing'];
    default:
      return ['done'];
  }
};

export const getDefaultRolesForDepartment = (department) => {
  switch (department) {
    case 'videography':
      return ['videography'];
    case 'photography':
      return ['photography'];
    default:
      return ['done'];
  }
};

export const normalizeRolesForDepartment = (department, roles) => {
  const allowed = new Set(getWorkRolesForDepartment(department));
  const incoming = Array.isArray(roles) ? roles : [];
  const filtered = incoming.filter((r) => allowed.has(r));
  return filtered.length ? filtered : getDefaultRolesForDepartment(department);
};

export const formatWorkRoleLabel = (role) => {
  switch (role) {
    case 'done':
      return 'Done';
    case 'videography':
      return 'Videography';
    case 'photography':
      return 'Photography';
    case 'editing':
      return 'Editing';
    default:
      return (role || '').replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }
};
