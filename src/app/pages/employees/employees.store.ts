import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { EmployeesService } from './employees.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { Employee } from '@shared/models';
import { SnackbarStore } from '@shared/components';

type EmployeesState = {
  employees: Employee[];
  filter: string;
};

export const EmployeesStore = signalStore(
  withState<EmployeesState>({ employees: [], filter: '' }),
  withComputed((store) => ({
    filteredEmployees: computed(() => {
      if (store.filter()) {
        const filter = store.filter().toLowerCase();
        return store.employees().filter((employee) => {
          const name = employee.firstName.toLowerCase();
          const lastName = employee.lastName.toLowerCase();
          return name.includes(filter) || lastName.includes(filter);
        });
      }
      return store.employees();
    }),
  })),
  withMethods(
    (
      store,
      employeesService = inject(EmployeesService),
      snackbar = inject(SnackbarStore)
    ) => ({
      init: rxMethod<void>(
        pipe(
          switchMap(() => {
            return employeesService.getEmployees().pipe(
              tapResponse(
                (employees) => {
                  patchState(store, { employees });
                },
                (error) => {
                  console.error(error);
                }
              )
            );
          })
        )
      ),
      deleteEmployeeById: rxMethod<number>(
        pipe(
          switchMap((id) => {
            return employeesService.deleteEmployeeById(id).pipe(
              tapResponse(
                (employees) => {
                  snackbar.show({
                    type: 'success',
                    message: 'Successfully removed!',
                  });
                  patchState(store, { employees });
                },
                (error) => {
                  snackbar.show({
                    type: 'fail',
                    message: 'Something went wrong!',
                  });
                  console.error(error);
                }
              )
            );
          })
        )
      ),
      setFilter(filter: string): void {
        patchState(store, { filter });
      },
    })
  )
);
