import {Routes} from '@angular/router';

const residenRegister=()=>import('./resident-form-create/resident-form-create').then(m=>m.ResidentFormCreate);
const residentList=()=>import('./resident-form-list/resident-form-list').then(m=>m.ResidentFormList);
const residentUpdate=()=>import('./resident-form-edit/resident-form-edit').then(m=>m.ResidentFormEdit);
const residentDetail=()=>import('./resident-detail/resident-detail').then(m=>m.ResidentDetail);
const ResidentRouter:Routes=[
  {path:'resident/register', loadComponent:residenRegister},
  {path:'resident/list', loadComponent:residentList},
  {path: 'resident/:id/edit', loadComponent: residentUpdate},
  {path: 'resident/:id/detail', loadComponent: residentDetail},
]
export {ResidentRouter  }
