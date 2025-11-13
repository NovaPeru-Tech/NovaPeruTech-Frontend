import { Routes } from '@angular/router';

// Lazy-loaded components
const staffMemberList = () =>
  import('./views/staff-member-list/staff-member-list').then(m => m.StaffMemberList);
const staffMemberForm = () =>
  import('./views/staff-member-form/staff-member-form').then(m => m.StaffMemberForm);
const staffMemberDetail = () =>
  import('./views/staff-member-detail/staff-member-detail').then(m => m.StaffMemberDetail);

const baseTitle = 'Veyra';
const staffRoutes:Routes = [
  { path: 'list',            loadComponent: staffMemberList,   title: `Staff | ${baseTitle}` },
  { path: 'list/:id/detail', loadComponent: staffMemberDetail, title: `Staff Member Detail | ${baseTitle}` },
  { path: 'list/new',        loadComponent: staffMemberForm,   title: `New Staff Member | ${baseTitle}` },
  { path: 'list/:id/edit',   loadComponent: staffMemberForm,   title: `Edit Staff Member | ${baseTitle}` }
];

export { staffRoutes };
