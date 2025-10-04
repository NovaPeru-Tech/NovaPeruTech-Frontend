import { Routes } from '@angular/router';
const signUp=()=>import('./views/sign-up/sign-up').then(m=>m.SignUpComponent);
const signIn=()=>import('./views/sign-in/sign-in').then(m=>m.SignInComponent);
const  IamRouters:Routes = [
  { path: 'sign-in', loadComponent: signIn },
  { path: 'sign-up/administrator', loadComponent: signUp, data: { role: 'administrator' } },
  { path: 'sign-up/familiar', loadComponent: signUp, data: { role: 'familiar' } }

];
export{IamRouters}
