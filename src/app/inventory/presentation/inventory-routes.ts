import { Routes } from '@angular/router';

// Lazy-loaded components
const medicationList = () =>
  import('./medication-list/medication-list').then(m => m.MedicationList);
const medicationForm = () =>
  import('./medication-form/medication-form').then(m => m.MedicationForm);
const medicationDetail = () =>
  import('./medication-detail/medication-detail').then(m => m.MedicationDetail);

const baseTitle = 'Veyra';
const inventoryRoutes: Routes = [
  { path:'medication/list',       loadComponent:medicationList,   title: `Medications | ${baseTitle}` },
  { path:'medication/:id/detail', loadComponent:medicationDetail, title: `Medication Detail | ${baseTitle}` },
  { path:'medication/new',        loadComponent:medicationForm,   title: `New Medication | ${baseTitle}` },
  { path:'medication/:id/edit',   loadComponent:medicationForm,   title: `Edit Medication | ${baseTitle}` }
];

export { inventoryRoutes };
