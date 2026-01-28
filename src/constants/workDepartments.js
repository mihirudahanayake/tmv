export const WORK_DEPARTMENTS = [
  'videography',
  'photography',
  'graphic_design',
  'announcing',
  'content_writing'
];

export const formatWorkDepartmentLabel = (dept) => {
  switch (dept) {
    case 'graphic_design':
      return 'Graphic design';
    case 'content_writing':
      return 'Content writing';
    default:
      return (dept || '').replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }
};
