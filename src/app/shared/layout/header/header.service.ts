import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, filter, map } from 'rxjs';
import { Breadcrumb } from './header.types';

@Injectable()
export class HeaderService {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  getBreadcrumbs(): Observable<Breadcrumb[]> {
    return this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(() => this.createBreadcrumbs(this.activatedRoute.root))
    );
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      if (
        child.snapshot.data['breadcrumb'] &&
        !breadcrumbs.find((b) => b.alias === child.snapshot.data['breadcrumb'])
      ) {
        breadcrumbs.push({
          alias: child.snapshot.data['breadcrumb'],
          path: url,
        });
      }
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
