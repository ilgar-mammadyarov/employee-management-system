import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
  inject,
} from '@angular/core';
import { UpdateEmployeeService } from './update-employee.service';
import { UpdateEmployeeStore } from './update-employee.store';
import { ActivatedRoute, Router } from '@angular/router';
import { AppRoutePath } from '@shared/constants';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ButtonComponent,
  InputComponent,
  InputFieldDirective,
  InputHelperDirective,
} from '@shared/components';
import { Employee } from '@shared/models';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [
    InputComponent,
    InputFieldDirective,
    InputHelperDirective,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  providers: [UpdateEmployeeService, UpdateEmployeeStore],
  templateUrl: './update-employee.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateEmployeeComponent implements OnInit {
  private readonly updateEmployeeStore = inject(UpdateEmployeeStore);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  readonly employee = this.updateEmployeeStore.employee;

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

  constructor() {
    effect(() => {
      if (this.employee()) {
        this.setForm();
      }
    });
  }

  ngOnInit(): void {
    this.initializeStore();
  }

  initializeStore(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.updateEmployeeStore.init(+id);
    } else {
      this.router.navigateByUrl(AppRoutePath.Employees);
    }
  }

  setForm(): void {
    this.form.setValue({
      firstName: this.employee()!.firstName,
      lastName: this.employee()!.lastName,
      email: this.employee()!.email,
      phoneNumber: this.employee()!.phoneNumber,
      jobTitle: this.employee()!.jobTitle,
      department: this.employee()!.department,
    });
    this.form.markAsPristine();
  }

  submit(): void {
    if (this.form.invalid) return;
    this.updateEmployeeStore.updateEmployee({
      id: this.employee()!.id,
      employee: this.form.value as Omit<Employee, 'id'>,
    });
  }
}
