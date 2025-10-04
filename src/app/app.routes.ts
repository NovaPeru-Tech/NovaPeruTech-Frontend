import { Routes } from '@angular/router';
import {Home} from './shared/presentation/views/home/home';
const pageNotFound=()=>import('./shared/presentation/views/page-not-found/page-not-found').then(m=>m.PageNotFound);
const iamRoutes=()=>import('./iam/presentation/iam-routers').then(m=>m.IamRouters);
const baseTitle='Veyra';
export const routes: Routes = [

  {path:'home',        component:Home                ,title:`Home-${baseTitle}`},
  {path:'',            redirectTo:'/home'            ,pathMatch:'full' },
  {path:'auth', loadChildren:iamRoutes },
  {path:'**',          loadComponent:pageNotFound    ,title:`Page Not Found-${baseTitle}`},

];

