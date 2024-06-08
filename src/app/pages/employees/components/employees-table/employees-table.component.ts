import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Employee } from '@shared/models';
import { EmployeesRoutePath } from '../../employees.constants';

@Component({
  selector: 'app-employees-table',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './employees-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesTableComponent {
  employees = input<Employee[]>([]);
  delete = output<number>();

  readonly updateEmployeePath = EmployeesRoutePath.UpdateEmployee;

  deleteEmployee(id: number): void {
    this.delete.emit(id);
  }
}
