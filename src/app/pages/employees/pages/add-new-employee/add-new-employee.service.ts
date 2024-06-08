import { Injectable, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { SnackbarStore } from '@shared/components';
import { Employee } from '@shared/models';
import { EmployeesApiService } from '@shared/services';
import { take, tap } from 'rxjs';

@Injectable()
export class AddNewEmployeeService {
  private readonly employeesApiService = inject(EmployeesApiService);
  private readonly snackbarStore = inject(SnackbarStore);

  addNewEmployee(newEmployee: Omit<Employee, 'id'>): void {
    const employeeWithId: Employee = { id: Date.now(), ...newEmployee };
    this.employeesApiService
      .addEmployee(employeeWithId)
      .pipe(take(1))
      .subscribe(() => {
        this.snackbarStore.show({
          type: 'success',
          message: 'Successfully added!',
        });
      });
  }
}
