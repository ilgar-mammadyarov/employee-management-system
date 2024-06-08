import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';
import { AddNewEmployeeComponent, UpdateEmployeeComponent } from './pages';
import { EmployeesRoutePath } from './employees.constants';

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: '',
    data: { breadcrumb: 'All Employees' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: EmployeesComponent,
      },
      {
        path: EmployeesRoutePath.AddNewEmployee,
        data: { breadcrumb: 'Add New Employee' },
        component: AddNewEmployeeComponent,
      },
      {
        path: `${EmployeesRoutePath.UpdateEmployee}/:id`,
        data: { breadcrumb: 'Update Employee' },
        component: UpdateEmployeeComponent,
      },
    ],
  },
];
