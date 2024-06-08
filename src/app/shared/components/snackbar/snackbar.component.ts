import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SnackbarStore } from './snackbar.store';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './snackbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {
  private readonly snackbarStore = inject(SnackbarStore);

  readonly snackbars = this.snackbarStore.snackbars;
}
