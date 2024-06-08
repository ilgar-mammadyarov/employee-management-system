import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ButtonComponent,
  InputComponent,
  InputFieldDirective,
  InputHelperDirective,
} from '@shared/components';
import { AddNewEmployeeService } from './add-new-employee.service';
import { Employee } from '@shared/models';

@Component({
  selector: 'app-add-new-employee',
  standalone: true,
  imports: [
    InputComponent,
    InputFieldDirective,
    InputHelperDirective,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  providers: [AddNewEmployeeService],
  templateUrl: './add-new-employee.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNewEmployeeComponent {
  private readonly newEmployeeService = inject(AddNewEmployeeService);
  private readonly formBuilder = inject(FormBuilder);

  readonly form = this.formBuilder.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
        Validators.pattern(/^[a-zA-Z]+$/),
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(12),
        Validators.pattern(/^[a-zA-Z]+$/),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.maxLength(12),
      ],
    ],
    jobTitle: ['', [Validators.required, Validators.maxLength(12)]],
    department: ['', [Validators.required, Validators.maxLength(12)]],
  });

  submit(): void {
    if (this.form.invalid) return;
    this.newEmployeeService.addNewEmployee(
      this.form.value as Omit<Employee, 'id'>
    );

    this.form.reset();
  }
}
