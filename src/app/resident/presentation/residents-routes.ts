import { Routes } from '@angular/router';

// Lazy-loaded components
const residentRegister = () =>
  import('./views/resident-form-create/resident-form-create').then(m => m.ResidentFormCreate);
const residentList = () =>
  import('./views/resident-list/resident-list').then(m => m.ResidentList);
const residentUpdate = () =>
  import('./views/resident-form-edit/resident-form-edit').then(m => m.ResidentFormEdit);
const residentDetail = () =>
  import('./views/resident-detail/resident-detail').then(m => m.ResidentDetail);

const baseTitle = 'Veyra';
const residentsRoutes: Routes = [
  { path: 'list',            loadComponent: residentList,     title: `Residents | ${baseTitle}` },
  { path: 'list/:id/detail', loadComponent: residentDetail,   title: `Resident Detail | ${baseTitle}` },
  { path: 'list/new',        loadComponent: residentRegister, title: `New Resident | ${baseTitle}` },
  { path: 'list/:id/edit',   loadComponent: residentUpdate,   title: `Edit Resident | ${baseTitle}` }
];

export { residentsRoutes };
