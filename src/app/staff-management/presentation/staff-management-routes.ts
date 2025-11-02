import { Routes } from '@angular/router';

const staffRegister=()=> import('./staff-form-create/staff-form-create').then(m => m.StaffFormCreate);
const staffList=()=>import('./staff-member-list/staff-member-list').then(m=>m.StaffMemberList);
const staffEdit=()=>import('./staff-form-edit/staff-form-edit').then(m => m.StaffFormEdit);
const staffDetail=()=> import('./staff-detail/staff-detail').then(m => m.StaffDetail);
const StaffManagementRoutes:Routes=[
  {path:'employee/register',loadComponent:staffRegister},
  {path:'employee/list',loadComponent:staffList},
  {path:'employee/:id/edit',loadComponent:staffEdit},
  {path:'employee/:id/detail',loadComponent:staffDetail},
  ]
export {StaffManagementRoutes }
