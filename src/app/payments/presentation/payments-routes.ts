import { Routes } from '@angular/router';

// Lazy-loaded components
const subscriptionChoose = () =>
  import('./views/subscription-choose/subscription-choose')
    .then(m => m.SubscriptionChoosePage);

const subscriptionPlanNursing = () =>
  import('./views/subscription-plan-nursing/subscription-plan-nursing')
    .then(m => m.SubscriptionPlanNursing);

const subscriptionPlanFamily = () =>
  import('./views/subscription-plan-family/subscription-plan-family')
    .then(m => m.SubscriptionPlanFamily);

const baseTitle = 'Veyra';

export const paymentsRoutes: Routes = [
  {
    path: 'choose',
    loadComponent: subscriptionChoose,
    title: `Choose Subscription | ${baseTitle}`
  },
  {
    path: 'plans/family',
    loadComponent: subscriptionPlanFamily,
    title: `Family Plan | ${baseTitle}`
  },
  {
    path: 'plans/nursing',
    loadComponent: subscriptionPlanNursing,
    title: `Nursing Home Plan | ${baseTitle}`
  }
];
