import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';

const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const iamRoutes = () =>
  import('./iam/presentation/iam.routes').then(m => m.iamRoutes);
const nursingHomeRoutes = () =>
  import('./nursing/presentation/nursing-routes').then(m => m.nursingRoutes);
const residentRoutes = () =>
  import('./nursing/presentation/nursing-routes').then(m => m.residentsRoutes);
const staffRoutes = () =>
  import('./hcm/presentation/hcm-routes').then(m => m.staffRoutes);
const contractsRoutes = () =>
  import('./hcm/presentation/hcm-routes').then(m => m.contractsRoutes);
const medicationRoutes = () =>
  import('./nursing/presentation/nursing-routes').then(m => m.medicationsRoutes);
const roomRoutes = () =>
  import('./nursing/presentation/nursing-routes').then(m => m.roomsRoutes);
const paymentsRoutes = () =>
  import('./payments/presentation/payments-routes').then(m => m.paymentsRoutes);

const baseTitle = 'Veyra';
export const routes: Routes = [
  { path: 'home',        component: Home,             title:`Home | ${baseTitle}` },
  { path: 'iam',         loadChildren: iamRoutes },
  { path: 'nursing',     loadChildren: nursingHomeRoutes },
  { path: 'residents',   loadChildren: residentRoutes },
  { path: 'staff',       loadChildren: staffRoutes },
  { path: 'contracts',   loadChildren: contractsRoutes },
  { path: 'medications', loadChildren: medicationRoutes },
  { path: 'rooms',       loadChildren: roomRoutes },
  { path: '',            redirectTo: '/home',         pathMatch:'full' },
  { path: '**',          loadComponent: pageNotFound, title:`Page Not Found | ${baseTitle}`}
];
