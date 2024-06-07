import { Routes } from '@angular/router';
import { AppRoutePath } from './shared';

export const routes: Routes = [
  {
    path: AppRoutePath.Employees,
    loadChildren: () =>
      import('./pages/employees/employees.routes').then(
        (m) => m.EMPLOYEES_ROUTES
      ),
  },
  {
    path: '',
    redirectTo: AppRoutePath.Employees,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: AppRoutePath.Employees,
  },
];
