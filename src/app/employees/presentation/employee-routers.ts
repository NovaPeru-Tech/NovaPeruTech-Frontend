import { Routes} from '@angular/router';

const staffRegister=()=> import('./staff-form-create/staff-form-create').then(m => m.StaffFormCreate);
const  staffList=()=>import('./staff-form-list/staff-form-list').then(m=>m.StaffFormList);

const EmployeeRouters:Routes=[
  {path:'employee/register',loadComponent:staffRegister},
  {path:'employee/list',loadComponent:staffList},
  ]
export {EmployeeRouters }
