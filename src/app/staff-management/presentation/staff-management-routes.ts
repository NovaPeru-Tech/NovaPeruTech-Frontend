import { Routes } from '@angular/router';

// Lazy-loaded components
const staffMemberList = () =>
  import('./staff-member-list/staff-member-list').then(m => m.StaffMemberList);
const staffMemberForm = () =>
  import('./staff-member-form/staff-member-form').then(m => m.StaffMemberForm);
const staffMemberDetail = () =>
  import('./staff-member-detail/staff-member-detail').then(m => m.StaffMemberDetail);

const baseTitle = 'Veyra';
const staffManagementRoutes:Routes = [
  { path: 'list',            loadComponent: staffMemberList,   title: `Staff Members | ${baseTitle}` },
  { path: 'list/:id/detail', loadComponent: staffMemberDetail, title: `Staff Member Detail | ${baseTitle}` },
  { path: 'list/new',        loadComponent: staffMemberForm,   title: `New Staff Member | ${baseTitle}` },
  { path: 'list/:id/edit',   loadComponent: staffMemberForm,   title: `Edit Staff Member | ${baseTitle}` }
];

export { staffManagementRoutes };
