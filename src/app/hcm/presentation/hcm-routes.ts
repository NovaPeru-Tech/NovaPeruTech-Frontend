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
const updateContractStatusForm = () =>
  import('./views/update-contract-status-form/update-contract-status-form').then(m => m.UpdateContractStatusForm);

const baseTitle = 'Veyra';
const hcmRoutes: Routes = [
  { path: 'staff',                                   loadComponent: staffMemberList,          title: `Staff | ${baseTitle}` },
  { path: 'staff/:id/show',                          loadComponent: staffMemberDetail,        title: `Staff Member Detail | ${baseTitle}` },
  { path: 'staff/new',                               loadComponent: staffMemberForm,          title: `New Staff Member | ${baseTitle}` },
  { path: 'staff/:id/edit',                          loadComponent: staffMemberForm,          title: `Edit Staff Member | ${baseTitle}` },
  { path: 'staff/:id/contracts',                     loadComponent: contractList,             title: `Contracts | ${baseTitle}` },
  { path: 'staff/:id/contracts/new',                 loadComponent: contractForm,             title: `New Contract | ${baseTitle}` },
  { path: 'staff/:staffMemberId/contracts/:id/edit', loadComponent: updateContractStatusForm, title: `Update Contract Status | ${baseTitle}` },
];

export { hcmRoutes };
