import { IsActiveMatchOptions } from '@angular/router';

export interface NavigationItem {
  id: string;
  label: string;
  description?: string;
  route?: string;
  icon?: string;
  badge?: string;
  children?: NavigationItem[];
  disabled?: boolean;
  expanded?: boolean;
  activeOptions?: { exact: boolean } | IsActiveMatchOptions;
}

export const NAVIGATION: NavigationItem[] = [
  {
    id: 'overview',
    label: "Vue d'ensemble",
    description: 'Suivez les indicateurs clés',
    children: [
      {
        id: 'stats',
        label: 'Statistiques',
        icon: 'chart-no-axes-combined',
        route: '/admin',
        activeOptions: { exact: true }
      }
    ]
  },
  {
    id: 'recruitment',
    label: 'Recrutement',
    description: 'Gérez les candidatures reçues',
    children: [
      {
        id: 'applications',
        label: 'Candidatures',
        icon: 'files',
        route: '/admin/applications',
        activeOptions: { exact: false }
      }
    ]
  },
  {
    id: 'inbox',
    label: 'Suivi',
    description: "Consultez l'activité récente",
    children: [
      {
        id: 'notifications',
        label: 'Notifications',
        icon: 'bell',
        route: '/admin/notifications',
        activeOptions: { exact: false }
      }
    ]
  }
];
