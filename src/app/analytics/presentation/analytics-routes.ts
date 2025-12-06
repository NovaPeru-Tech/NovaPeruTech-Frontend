import {Routes} from '@angular/router';

// Lazy-loaded components
const analyticsDashboard = () =>
  import('./views/analytics-dashboard/analytics-dashboard').then(m => m.AnalyticsDashboard);

const baseTitle = 'Veyra';
const analyticsRoutes: Routes = [
  { path: 'dashboard', loadComponent: analyticsDashboard, title: `Dashboard | ${baseTitle}` }
];

export {analyticsRoutes};
