import { Routes } from '@angular/router';
import { AuthLayout } from './layout/layout';

const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'sign-in',
        title: 'Sign In',
        loadComponent: () => import('./features/sign-in/sign-in').then((c) => c.AuthSignIn)
      }
    ]
  }
];

export default routes;
