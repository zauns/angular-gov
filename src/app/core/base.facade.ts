import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BaseFacade {
  protected readonly http = inject(HttpClient);
  protected readonly api = 'api/abastecimentos';

  protected readonly _loading = signal(false);
  readonly loading = this._loading.asReadonly();
  readonly error = signal<string | null>(null);
}
