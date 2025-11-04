import { Routes } from '@angular/router';

const staffList=()=>import('./staff-member-list/staff-member-list').then(m=>m.StaffMemberList);
const staffMemberForm=()=>import('./staff-member-form/staff-member-form').then(m => m.StaffMemberForm);
const staffDetail=()=> import('./staff-member-detail/staff-member-detail').then(m => m.StaffMemberDetail);
const StaffManagementRoutes:Routes=[
  {path:'employee/register',loadComponent:staffMemberForm},
  {path:'employee/list',loadComponent:staffList},
  {path:'employee/:id/edit',loadComponent:staffMemberForm},
  {path:'employee/:id/detail',loadComponent:staffDetail},
  ]
export {StaffManagementRoutes }
