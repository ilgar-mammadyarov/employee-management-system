import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Snackbar } from './snackbar.types';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { interval, map, pipe, switchMap, take } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { SNACKBAR_VISIBILITY_DURATION } from './snackbar.constants';

type SnackbarState = {
  snackbars: Snackbar[];
};

export const SnackbarStore = signalStore(
  { providedIn: 'root' },
  withState<SnackbarState>({ snackbars: [] }),
  withMethods((store) => ({
    show: rxMethod<Snackbar>(
      pipe(
        switchMap((snackbar) => {
          patchState(store, { snackbars: [snackbar, ...store.snackbars()] });
          return interval(SNACKBAR_VISIBILITY_DURATION).pipe(
            take(1),
            tapResponse(
              () => {
                const [, ...snackbars] = [...store.snackbars()];
                patchState(store, { snackbars });
              },
              () => {}
            )
          );
        })
      )
    ),
  }))
);
