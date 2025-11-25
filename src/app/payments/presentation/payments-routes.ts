import { Routes } from '@angular/router';

// Lazy-loaded views
const subscriptionPlan = () =>
  import('./views/subscription-plan/subscription-plan').then(
    m => m.SubscriptionPlan);
const paymentConfirmed = () =>
  import('./views/payment-confirmed/payment-confirmed').then(
    m => m.PaymentConfirmed);
const paymentCancelled = () =>
  import('./views/payment-cancelled/payment-cancelled').then(
    m => m.PaymentCancelled);

const baseTitle = 'Veyra';

const paymentsRoutes: Routes = [
  {
    path: 'plans',
    loadComponent: subscriptionPlan,
    title: `Subscription Plans | ${baseTitle}`
  },
  {
    path: 'confirmed',
    loadComponent: paymentConfirmed,
    title: `Payment Confirmed | ${baseTitle}`
  },
  {
    path: 'cancelled',
    loadComponent: paymentCancelled,
    title: `Payment Cancelled | ${baseTitle}`
  }
];

export { paymentsRoutes };
