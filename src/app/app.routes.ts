import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';

const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const iamRoutes = () =>
  import('./iam/presentation/iam-routers').then(m => m.IamRouters);
const nursingHomeRoutes = () =>
  import('./nursingHome/presentation/nursing-home-routers').then(m => m.NursingHomeRouters);
const residentRoutes = () =>
  import('./resident/presentation/residents-routes').then(m => m.residentsRoutes);
const staffManagementRoutes = () =>
  import('./staff-management/presentation/staff-management-routes').then(m => m.staffManagementRoutes);
const inventoryRoutes = () =>
  import('./inventory/presentation/Inventory-router').then(m => m.InventoryRouter);

const baseTitle = 'Veyra';
export const routes: Routes = [
  { path: 'home',      component: Home,             title:`Home | ${baseTitle}` },
  { path: 'auth',      loadChildren: iamRoutes },
  { path: '',          loadChildren: nursingHomeRoutes },
  { path: 'residents', loadChildren: residentRoutes },
  { path: 'staff',     loadChildren: staffManagementRoutes },
  { path: 'inventory', loadChildren: inventoryRoutes },
  { path: '',          redirectTo: '/home',         pathMatch:'full' },
  { path: '**',        loadComponent: pageNotFound, title:`Page Not Found | ${baseTitle}`}
];
