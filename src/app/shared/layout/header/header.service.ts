import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, filter } from 'rxjs';

@Injectable()
export class HeaderService {
  constructor(private router: Router) {}

  getNavigationEndEvent(): Observable<NavigationEnd> {
    return this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    );
  }
}
