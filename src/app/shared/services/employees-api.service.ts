import { Injectable } from '@angular/core';
import { EMPLOYEES_MOCK_DATA } from '@shared/constants';
import { Employee } from '@shared/models';
import {
  BehaviorSubject,
  Observable,
  delay,
  find,
  map,
  of,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeesApiService {
  private readonly employeesMockData$ = new BehaviorSubject<Employee[]>(
    EMPLOYEES_MOCK_DATA
  );

  getEmployees(): Observable<Employee[]> {
    return this.employeesMockData$.asObservable().pipe(delay(1000));
  }

  addEmployee(newEmployee: Employee): Observable<Employee> {
    const currentEmployees = this.employeesMockData$.getValue();
    this.employeesMockData$.next([...currentEmployees, newEmployee]);
    return of(newEmployee).pipe(delay(1000));
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.employeesMockData$.pipe(
      map((employees) => {
        const employee = employees.find((e) => e.id === id);
        if (employee) {
          return employee;
        }
        throw Error('Not found');
      })
    );
  }

  updateEmployeeById(
    id: number,
    e: Omit<Employee, 'id'>
  ): Observable<Employee> {
    const employees = this.employeesMockData$.getValue();
    const employeeIndex = employees.findIndex((employee) => employee.id === id);
    if (employeeIndex !== -1) {
      const employee: Employee = {
        id,
        firstName: e.firstName,
        lastName: e.lastName,
        email: e.email,
        phoneNumber: e.phoneNumber,
        jobTitle: e.jobTitle,
        department: e.department,
      };

      employees[employeeIndex] = employee;
      this.employeesMockData$.next(employees);
      return of(employee).pipe(delay(1000));
    } else {
      throw Error('Not found');
    }
  }

  deleteEmployeeById(id: number): Observable<Employee[]> {
    const employees = this.employeesMockData$
      .getValue()
      .filter((employee) => employee.id !== id);
    this.employeesMockData$.next(employees);
    return this.employeesMockData$.asObservable().pipe(delay(1000));
  }
}
