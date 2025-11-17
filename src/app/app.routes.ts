import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';

const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const iamRoutes = () =>
  import('./iam/presentation/iam-routers').then(m => m.IamRouters);
const nursingHomeRoutes = () =>
  import('./nursing/presentation/nursing-routes').then(m => m.nursingRoutes);
const residentRoutes = () =>
  import('./nursing/presentation/nursing-routes').then(m => m.residentsRoutes);
const staffRoutes = () =>
  import('./hcm/presentation/hcm-routes').then(m => m.staffRoutes);
const contractsRoutes = () =>
  import('./hcm/presentation/hcm-routes').then(m => m.contractsRoutes);
const inventoryRoutes = () =>
  import('./inventory/presentation/inventory-routes').then(m => m.inventoryRoutes);
const roomRoutes = () =>
  import('./nursing/presentation/nursing-routes').then(m => m.roomsRoutes);

const baseTitle = 'Veyra';
export const routes: Routes = [
  { path: 'home',      component: Home,             title:`Home | ${baseTitle}` },
  { path: 'auth',      loadChildren: iamRoutes },
  { path: 'nursing',   loadChildren: nursingHomeRoutes },
  { path: 'residents', loadChildren: residentRoutes },
  { path: 'staff',     loadChildren: staffRoutes },
  { path: 'contracts', loadChildren: contractsRoutes },
  { path: 'inventory', loadChildren: inventoryRoutes },
  { path: 'rooms',     loadChildren: roomRoutes },
  { path: '',          redirectTo: '/home',         pathMatch:'full' },
  { path: '**',        loadComponent: pageNotFound, title:`Page Not Found | ${baseTitle}`}
];
