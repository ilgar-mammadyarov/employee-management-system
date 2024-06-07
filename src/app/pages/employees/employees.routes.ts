import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';

export const EMPLOYEES_ROUTES: Routes = [
  {
    path: '',
    component: EmployeesComponent,
    // children: [
    //     {
    //         path: '',
    //         pathMatch: 'full',
    //         redirectTo: 'flight-search'
    //     },
    //     {
    //         path: 'flight-search',
    //         component: FlightSearchComponent
    //     },
    //     {
    //         path: 'passenger-search',
    //         component: PassengerSearchComponent
    //     },
    //     {
    //         path: 'flight-edit/:id',
    //         component: FlightEditComponent
    //     }
    // ]
  },
];
