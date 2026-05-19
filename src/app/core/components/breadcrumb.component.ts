import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

interface BreadcrumbSegment {
  label: string;
  route?: string;
}

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly routeData = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute.root;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.snapshot.data;
      })
    ),
    { initialValue: {} }
  );

  protected readonly segments = computed<BreadcrumbSegment[]>(() => {
    const data = this.routeData();
    const raw = data as Record<string, unknown>;
    const breadcrumb = (raw['breadcrumb'] as string[]) ?? [];
    const segments: BreadcrumbSegment[] = [
      { label: 'Home' },
      { label: 'Combustíveis' }
    ];

    const urlSegments = this.router.url.split('/').filter(s => s);
    for (let i = 0; i < breadcrumb.length; i++) {
      const isLast = i === breadcrumb.length - 1;
      const route = isLast
        ? undefined
        : '/' + urlSegments.slice(0, urlSegments.length - (breadcrumb.length - 1 - i)).join('/');
      segments.push({ label: breadcrumb[i], route });
    }
    return segments;
  });

}
