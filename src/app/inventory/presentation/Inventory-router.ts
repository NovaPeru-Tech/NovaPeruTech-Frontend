import {Routes} from '@angular/router';

const MedicationList=()=>import('./medication-list/medication-list').then(m=>m.MedicationList);
const MedicationForm=()=> import('./medication-form/medication-form').then(m=>m.MedicationForm);
const MedicationDetail=()=>import('./medication-form-detail/medication-form-detail').then(m=>m.MedicationFormDetail);
const InventoryRouter:Routes=[
  {path:'medication/create', loadComponent:MedicationForm},
  { path:'medication/list', loadComponent:MedicationList},
  {path:'medication/:id/edit',loadComponent:MedicationForm},
  {path:'medication/:id/detail',loadComponent:MedicationDetail},
  ]
export  {InventoryRouter}
