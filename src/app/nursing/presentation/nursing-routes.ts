import { Routes } from '@angular/router';

// Lazy-loaded components
const residentForm = () =>
  import('./views/resident-form/resident-form').then(m => m.ResidentForm);
const residentList = () =>
  import('./views/resident-list/resident-list').then(m => m.ResidentList);
const residentDetail = () =>
  import('./views/resident-detail/resident-detail').then(m => m.ResidentDetail);
const residentMedicalRecord = () =>
  import('./views/medical-record-list/medical-record-list').then(m => m.MedicalRecordList);
const allergyForm = () =>
  import('./views/allergy-form/allergy-form').then(m => m.AllergyForm);
const roomList = () =>
  import('./views/room-list/room-list').then(m => m.RoomList);
const roomForm = () =>
  import('./views/room-form/room-form').then(m => m.RoomForm);
const nursingHomeForm = () =>
  import('./views/nursing-home-form/nursing-home-form').then(m => m.NursingHomeForm)
const medicationList = () =>
  import('./views/medication-list/medication-list').then(m => m.MedicationList);
const medicationForm = () =>
  import('./views/medication-form/medication-form').then(m => m.MedicationForm);
const assignRoomForm = () =>
  import('./views/assign-room-form/assign-room-form').then(m => m.AssignRoomForm);

const baseTitle = 'Veyra';
const nursingRoutes: Routes = [
  { path: 'nursing-homes/new',                  loadComponent: nursingHomeForm,       title: `New Nursing Home | ${baseTitle}` },
  { path: 'residents',                          loadComponent: residentList,          title: `Residents | ${baseTitle}` },
  { path: 'residents/:id/show',                 loadComponent: residentDetail,        title: `Resident Detail | ${baseTitle}` },
  { path: 'residents/new',                      loadComponent: residentForm,          title: `New Resident | ${baseTitle}` },
  { path: 'residents/:id/edit',                 loadComponent: residentForm,          title: `Edit Resident | ${baseTitle}` },
  { path: 'residents/:id/room-assignments/new', loadComponent: assignRoomForm,        title: `Assign-Room | ${baseTitle}` },
  { path: 'residents/:id/medical-records',      loadComponent: residentMedicalRecord, title: `Medical Record | ${baseTitle}` },
  { path: 'residents/:id/allergies/new',        loadComponent: allergyForm,           title: `New Allergy | ${baseTitle}` },
  { path: 'rooms',                              loadComponent: roomList,              title: `Rooms | ${baseTitle}` },
  { path: 'rooms/new',                          loadComponent: roomForm,              title: `New Room | ${baseTitle}` },
  { path: 'rooms/:id/edit',                     loadComponent: roomForm,              title: `Edit Room | ${baseTitle}` },
  { path: 'residents/:id/medications',          loadComponent: medicationList,        title: `Medications | ${baseTitle}` },
  { path: 'residents/:id/medications/new',      loadComponent: medicationForm,        title: `New Medication | ${baseTitle}` }
];

export { nursingRoutes };
