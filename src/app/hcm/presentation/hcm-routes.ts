import { Routes } from '@angular/router';

// Lazy-loaded components
const staffMemberList = () =>
  import('./views/staff-member-list/staff-member-list').then(m => m.StaffMemberList);
const staffMemberForm = () =>
  import('./views/staff-member-form/staff-member-form').then(m => m.StaffMemberForm);
const staffMemberDetail = () =>
  import('./views/staff-member-detail/staff-member-detail').then(m => m.StaffMemberDetail);
const contractList = () =>
  import('./views/contract-list/contract-list').then(m => m.ContractList);
const contractForm = () =>
  import('./views/contract-form/contract-form').then(m => m.ContractForm);

const baseTitle = 'Veyra';
const staffRoutes: Routes = [
  { path: 'list',            loadComponent: staffMemberList,   title: `Staff | ${baseTitle}` },
  { path: 'list/:id/detail', loadComponent: staffMemberDetail, title: `Staff Member Detail | ${baseTitle}` },
  { path: 'list/new',        loadComponent: staffMemberForm,   title: `New Staff Member | ${baseTitle}` },
  { path: 'list/:id/edit',   loadComponent: staffMemberForm,   title: `Edit Staff Member | ${baseTitle}` }
];

const contractsRoutes: Routes = [
  { path: 'list/:id',        loadComponent: contractForm,      title: `Contracts | ${baseTitle}` },
  { path: 'list/:id/new',    loadComponent: contractList,      title: `New Contract | ${baseTitle}` }
];

export { staffRoutes };
export { contractsRoutes };
