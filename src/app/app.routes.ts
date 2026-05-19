import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    data: { breadcrumb: ['Dashboard'] }
  },
  {
    path: 'consulta',
    loadComponent: () => import('./consulta/consulta.component').then(m => m.ConsultaComponent),
    data: { breadcrumb: ['Consulta'] }
  },
  {
    path: 'consulta/:id',
    loadComponent: () => import('./consulta/detalhe.component').then(m => m.DetalheComponent),
    data: { breadcrumb: ['Consulta', 'Detalhe'] }
  },
  { path: '**', redirectTo: 'dashboard' }
];
