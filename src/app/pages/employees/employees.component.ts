import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ButtonComponent } from '@shared/components';
import { EmployeesTableComponent } from './components';
import { EmployeesStore } from './employees.store';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { EmployeesService } from './employees.service';
import { EmployeesRoutePath } from './employees.constants';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    ButtonComponent,
    EmployeesTableComponent,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet,
  ],
  providers: [EmployeesService, EmployeesStore],
  templateUrl: './employees.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent implements OnInit {
  private readonly employeesStore = inject(EmployeesStore);

  readonly searchControl = new FormControl('');
  readonly employees = this.employeesStore.filteredEmployees;
  readonly addNewEmployeeRoutePath = EmployeesRoutePath.AddNewEmployee;
  readonly deletedEmployeeId = signal<number | null>(null);

  ngOnInit(): void {
    this.employeesStore.init();
    this.search();
  }

  search(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((filter) => {
        this.employeesStore.setFilter(filter || '');
      });
  }

  deleteEmployee(): void {
    if (this.deletedEmployeeId() !== null) {
      this.employeesStore.deleteEmployeeById(this.deletedEmployeeId()!);
    }
  }
}
