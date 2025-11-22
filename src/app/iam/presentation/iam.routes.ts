import {Routes} from '@angular/router';

const signInForm = () =>
  import('./views/sign-in-form/sign-in-form').then(m => m.SignInForm);
const signUpForm = () =>
  import('./views/sign-up-form/sign-up-form').then(m => m.SignUpForm);

const baseTitle = 'Veyra';
const iamRoutes: Routes = [
  { path: 'sign-in', loadComponent: signInForm, title:`Sign In | ${baseTitle}` },
  { path: 'sign-up', loadComponent: signUpForm, title:`Sign Up | ${baseTitle}` }
];

export { iamRoutes };
