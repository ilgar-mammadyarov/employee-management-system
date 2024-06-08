import { Injectable, inject } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { EmployeesApiService } from '@shared/services';
import { Employee } from '@shared/models';

@Injectable()
export class EmployeesService {
  private readonly employeeApiService = inject(EmployeesApiService);

  getEmployees(): Observable<Employee[]> {
    return this.employeeApiService.getEmployees();
  }

  deleteEmployeeById(id: number): Observable<Employee[]> {
    return this.employeeApiService.deleteEmployeeById(id);
  }
}
