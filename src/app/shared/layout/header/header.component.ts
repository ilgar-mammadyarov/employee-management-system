import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderService } from './header.service';
import { HeaderStore } from './header.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  providers: [HeaderService, HeaderStore],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly headerStore = inject(HeaderStore);

  readonly breadcrumbs = this.headerStore.breadcrumbs;

  constructor() {
    this.headerStore.init();
  }
}
