import { Injectable, inject } from '@angular/core';
import { Employee } from '@shared/models';
import { EmployeesApiService } from '@shared/services';
import { Observable } from 'rxjs';

@Injectable()
export class UpdateEmployeeService {
  private readonly employeesApiService = inject(EmployeesApiService);

  getEmployeeById(id: number): Observable<Employee> {
    return this.employeesApiService.getEmployeeById(id);
  }

  updateEmployeeById(
    id: number,
    employee: Omit<Employee, 'id'>
  ): Observable<Employee> {
    return this.employeesApiService.updateEmployeeById(id, employee);
  }
}
