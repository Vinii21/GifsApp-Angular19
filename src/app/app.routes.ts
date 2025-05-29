import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./gifs/pages/dashboardPage/dashboardPage.component'),
    children: [
      {
        path: 'trending',
        loadComponent: () => import('./gifs/pages/trendingPage/trendingPage.component')
      },
      {
        path: 'search',
        loadComponent: () => import('./gifs/pages/searchPage/searchPage.component')
      },
      {
        path: '**',
        redirectTo: 'trending'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
