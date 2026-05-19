import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Abastecimento } from '../models/abastecimento';

@Injectable({ providedIn: 'root' })
export class DetalheFacade {
  private readonly http = inject(HttpClient);
  private readonly api = 'api/abastecimentos';

  readonly registro = signal<Abastecimento | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  carregar(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<Abastecimento>(`${this.api}/${id}`).subscribe({
      next: (item) => {
        this.registro.set(item);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Registro não encontrado.');
        this.loading.set(false);
      }
    });
  }
}
