import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Breadcrumb } from './header.types';
import { pipe, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { HeaderService } from './header.service';
import { tapResponse } from '@ngrx/operators';

type HeaderState = {
  breadcrumbs: Breadcrumb[];
};

export const HeaderStore = signalStore(
  withState<HeaderState>({ breadcrumbs: [] }),
  withMethods((store, headerService = inject(HeaderService)) => ({
    init: rxMethod<void>(
      pipe(
        switchMap(() => {
          return headerService.getBreadcrumbs().pipe(
            tapResponse(
              (breadcrumbs) => {
                patchState(store, { breadcrumbs });
              },
              (error) => {
                console.error(error);
              }
            )
          );
        })
      )
    ),
  }))
);
