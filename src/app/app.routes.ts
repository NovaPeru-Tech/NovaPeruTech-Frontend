import { Routes } from '@angular/router';
import {Home} from './shared/presentation/views/home/home';
const pageNotFound=()=>import('./shared/presentation/views/page-not-found/page-not-found').then(m=>m.PageNotFound);
const nursingHomeRoutes=()=>import('./nursingHome/presentation/nursing-home-routers').then(m=>m.NursingHomeRouters);
const residentRoutes=()=>import('./resident/presentation/resident-router').then(m=>m.ResidentRouter);
const employeeRoutes=()=>import('./employees/presentation/employee-routers').then(m=>m.EmployeeRouters);
const signIn = () =>
  import('./iam/presentation/components/sign-in.component/sign-in.component').then(m => m.SignInComponent);
const signUp = () =>
  import('./iam/presentation/components/sign-up.component/sign-up.component').then(m => m.SignUpComponent);

const baseTitle='Veyra';
export const routes: Routes = [
  {path:'sign-in', loadComponent:signIn, title:`Sign In | ${baseTitle}`},
  {path:'sign-up', loadComponent:signUp, title:`Sign Up | ${baseTitle}`},
  {path:'home',        component:Home                ,title:`Home-${baseTitle}`},
  {path:'',            redirectTo:'/home'            ,pathMatch:'full' },
  {path:'', loadChildren:nursingHomeRoutes },
  {path:'',loadChildren:residentRoutes},
  {path:'',loadChildren:employeeRoutes},
  {path:'**',          loadComponent:pageNotFound    ,title:`Page Not Found-${baseTitle}`},
];

