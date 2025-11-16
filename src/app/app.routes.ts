import { Routes } from '@angular/router';
import { Home } from './shared/presentation/views/home/home';

const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);
const signIn = () =>
  import('./iam/presentation/components/sign-in.component/sign-in.component').then(m => m.SignInComponent);
const signUp = () =>
  import('./iam/presentation/components/sign-up.component/sign-up.component').then(m => m.SignUpComponent);
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

const baseTitle = 'Veyra';
export const routes: Routes = [
  { path: 'sign-in',   loadComponent:signIn,        title:`Sign In | ${baseTitle}`},
  { path: 'sign-up',   loadComponent:signUp,        title:`Sign Up | ${baseTitle}`},
  { path: 'home',      component: Home,             title:`Home | ${baseTitle}` },
  { path: 'nursing',   loadChildren: nursingHomeRoutes },
  { path: 'residents', loadChildren: residentRoutes },
  { path: 'staff',     loadChildren: staffRoutes },
  { path: 'contracts', loadChildren: contractsRoutes },
  { path: 'medications', loadChildren: medicationRoutes },
  { path: 'rooms',     loadChildren: roomRoutes },
  { path: '',          redirectTo: '/home',         pathMatch:'full' },
  { path: '**',        loadComponent: pageNotFound, title:`Page Not Found | ${baseTitle}`}
];
