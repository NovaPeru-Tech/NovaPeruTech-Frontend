import { Routes } from '@angular/router';
const  nursingHomeRegister=()=>import('./nursing-home-form/nursing-home-form').then(m=>m.NursingHomeForm)
const NursingHomeRouters:Routes=[
  { path:'register/nursingHome', loadComponent:nursingHomeRegister }
]

/*
* @purpose: Define routes for Nursing Home module
* @description: This file defines the routing configuration for the Nursing Home module, including paths and lazy-loaded components for managing nursing home-related views.
* */

export { NursingHomeRouters }
