import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';

const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const iamRoutes = () =>
  import('./iam/presentation/iam.routes').then(m => m.iamRoutes);
const analyticsRoutes = () =>
  import('./analytics/presentation/analytics-routes').then(m => m.analyticsRoutes);
const nursingRoutes = () =>
  import('./nursing/presentation/nursing-routes').then(m => m.nursingRoutes);
const hcmRoutes = () =>
  import('./hcm/presentation/hcm-routes').then(m => m.hcmRoutes);
const paymentsRoutes = () =>
  import('./payments/presentation/payments-routes').then(m => m.paymentsRoutes);

const baseTitle = 'Veyra';
export const routes: Routes = [
  { path: 'home',        component: Home,             title:`Home | ${baseTitle}` },
  { path: 'iam',         loadChildren: iamRoutes },
  { path: 'analytics',   loadChildren: analyticsRoutes },
  { path: 'nursing',     loadChildren: nursingRoutes },
  { path: 'hcm',         loadChildren: hcmRoutes },
  { path: 'payments',    loadChildren: paymentsRoutes },
  { path: '',            redirectTo: '/home',         pathMatch:'full' },
  { path: '**',          loadComponent: pageNotFound, title:`Page Not Found | ${baseTitle}`}
];
