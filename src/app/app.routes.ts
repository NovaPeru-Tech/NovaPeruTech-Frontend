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
  import('./staff/presentation/staff-routes').then(m => m.staffRoutes);
const inventoryRoutes = () =>
  import('./inventory/presentation/inventory-routes').then(m => m.inventoryRoutes);

const baseTitle = 'Veyra';
export const routes: Routes = [
  { path: 'home',      component: Home,             title:`Home | ${baseTitle}` },
  { path: 'auth',      loadChildren: iamRoutes },
  { path: 'nursing',   loadChildren: nursingHomeRoutes },
  { path: 'residents', loadChildren: residentRoutes },
  { path: 'staff',     loadChildren: staffRoutes },
  { path: 'inventory', loadChildren: inventoryRoutes },
  { path: '',          redirectTo: '/home',         pathMatch:'full' },
  { path: '**',        loadComponent: pageNotFound, title:`Page Not Found | ${baseTitle}`}
];
