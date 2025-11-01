import { Routes} from '@angular/router';

const staffRegister=()=> import('./staff-form-create/staff-form-create').then(m => m.StaffFormCreate);
const  staffList=()=>import('./staff-form-list/staff-form-list').then(m=>m.StaffFormList);
const staffEdit=()=>import('./staff-form-edit/staff-form-edit').then(m => m.StaffFormEdit);
const staffDetail=()=> import('./staff-detail/staff-detail').then(m => m.StaffDetail);
const EmployeeRouters:Routes=[
  {path:'employee/register',loadComponent:staffRegister},
  {path:'employee/list',loadComponent:staffList},
  {path:'employee/:id/edit',loadComponent:staffEdit},
  {path:'employee/:id/detail',loadComponent:staffDetail},
  ]
export {EmployeeRouters }
