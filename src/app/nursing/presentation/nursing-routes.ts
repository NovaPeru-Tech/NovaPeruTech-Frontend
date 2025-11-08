import { Routes } from '@angular/router';

// Lazy-loaded components
const residentForm = () =>
  import('./views/resident-form/resident-form').then(m => m.ResidentForm);
const residentList = () =>
  import('./views/resident-list/resident-list').then(m => m.ResidentList);
const residentDetail = () =>
  import('./views/resident-detail/resident-detail').then(m => m.ResidentDetail);
const roomList = () =>
  import('./views/room-list/room-list').then(m => m.RoomList);
const roomForm = () =>
  import('./views/room-form/room-form').then(m => m.RoomForm);
const nursingHomeRegister = () =>
  import('./views/nursing-home-form/nursing-home-form').then(m => m.NursingHomeForm)


const baseTitle = 'Veyra';
const residentsRoutes: Routes = [
  { path: 'list',            loadComponent: residentList,   title: `Residents | ${baseTitle}` },
  { path: 'list/:id/detail', loadComponent: residentDetail, title: `Resident Detail | ${baseTitle}` },
  { path: 'list/new',        loadComponent: residentForm,   title: `New Resident | ${baseTitle}` },
  { path: 'list/:id/edit',   loadComponent: residentForm,   title: `Edit Resident | ${baseTitle}` }
];

const roomsRoutes: Routes = [
  { path: 'list',            loadComponent: roomList,   title: `Rooms | ${baseTitle}` },
  { path: 'list/new',        loadComponent: roomForm,   title: `New Room | ${baseTitle}` },
  { path: 'list/:id/edit',   loadComponent: roomForm,   title: `Edit Room | ${baseTitle}` }
];

const nursingRoutes: Routes = [
  { path:'register/nursingHome', loadComponent:nursingHomeRegister }
];

export { residentsRoutes };
export { roomsRoutes };
export { nursingRoutes };
