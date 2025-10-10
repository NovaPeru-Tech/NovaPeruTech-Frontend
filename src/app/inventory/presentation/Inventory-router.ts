import {Routes} from '@angular/router';

const MedicationCreate=()=>import('./medication-form-create/medication-form-create').then(m=>m.MedicationFormCreate);
const MedicationList=()=>import('./medication-form-list/medication-form-list').then(m=>m.MedicationFormList);
const MedicationEdit=()=> import('./medication-form-edit/medication-form-edit').then(m=>m.MedicationFormEdit);
const MedicationDetail=()=>import('./medication-form-detail/medication-form-detail').then(m=>m.MedicationFormDetail);
const InventoryRouter:Routes=[
  {path:'medication/create', loadComponent:MedicationCreate},
  { path:'medication/list', loadComponent:MedicationList},
  {path:'medication/:id/edit',loadComponent:MedicationEdit},
  {path:'medication/:id/detail',loadComponent:MedicationDetail},
  ]
export  {InventoryRouter}
