import { Routes } from '@angular/router';
import { AdminLayout } from './layout/layout';

const routes: Routes = [
  {
    path: '',
    component: AdminLayout,
    children: [
      {
        path: '',
        title: 'Admin',
        loadComponent: () => import('./modules/stats/features/stats')
      },
      {
        path: 'applications',
        title: 'Candidatures',
        loadComponent: () => import('./modules/applications/features/application-list/application-list')
      },
      {
        path: 'applications/:id',
        title: 'Détail de la candidature',
        loadComponent: () => import('./modules/applications/features/application-detail/application-detail')
      },
      {
        path: 'notifications',
        title: 'Notifications',
        loadComponent: () => import('./modules/notifications/features/notification-list/notification-list')
      }
    ]
  }
];

export default routes;
