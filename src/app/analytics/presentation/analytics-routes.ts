import {Routes} from '@angular/router';

// Lazy-loaded components
const analyticsDashboard = () =>
  import('./views/analytics-dashboard/analytics-dashboard').then(m => m.AnalyticsDashboard);

const baseTitle = 'Veyra';
const analyticsRoutes: Routes = [
  {path: 'dashboard', loadComponent: analyticsDashboard, title: `Analytics Dashboard | ${baseTitle}`}
];

export {analyticsRoutes};
