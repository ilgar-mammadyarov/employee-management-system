import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Employee } from '@shared/models';
import { UpdateEmployeeService } from './update-employee.service';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { SnackbarStore } from '@shared/components';
import { Router } from '@angular/router';
import { AppRoutePath } from '@shared/constants';

type UpdateEmployeeState = {
  employee: Employee | null;
};

export const UpdateEmployeeStore = signalStore(
  withState<UpdateEmployeeState>({ employee: null }),
  withMethods(
    (
      store,
      updateEmployeeService = inject(UpdateEmployeeService),
      snackbar = inject(SnackbarStore),
      router = inject(Router)
    ) => ({
      init: rxMethod<number>(
        pipe(
          switchMap((id) => {
            return updateEmployeeService.getEmployeeById(id).pipe(
              tapResponse(
                (employee) => {
                  patchState(store, { employee });
                },
                (error) => {
                  console.error(error);
                  snackbar.show({ type: 'fail', message: 'No such employee!' });
                  router.navigate([AppRoutePath.Employees]);
                }
              )
            );
          })
        )
      ),
      updateEmployee: rxMethod<{ id: number; employee: Omit<Employee, 'id'> }>(
        pipe(
          switchMap(({ id, employee }) => {
            return updateEmployeeService.updateEmployeeById(id, employee).pipe(
              tapResponse(
                (employee) => {
                  snackbar.show({
                    type: 'success',
                    message: 'Successfully updated!',
                  });
                  patchState(store, { employee });
                },
                (error) => {
                  console.error(error);
                  snackbar.show({ type: 'fail', message: 'Cannot update!' });
                }
              )
            );
          })
        )
      ),
    })
  )
);
