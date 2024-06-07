import { signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Breadcrumb } from './header.types';
import { pipe, switchMap } from 'rxjs';
import { inject } from '@angular/core';
import { HeaderService } from './header.service';

type HeaderState = {
  breadcrumbs: Breadcrumb[];
};

export const BooksStore = signalStore(
  withState<HeaderState>({ breadcrumbs: [] }),
  withMethods((store, headerService = inject(HeaderService)) => ({
    init: rxMethod<any>(
      pipe(
        switchMap(() => {
          return headerService.getNavigationEndEvent();
        })
      )
    ),
  }))
);
