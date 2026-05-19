import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, switchMap, catchError, finalize, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Abastecimento } from '../models/abastecimento';
import { BaseFacade } from '../core/base.facade';

@Injectable({ providedIn: 'root' })
export class DetalheFacade extends BaseFacade {
  private readonly id$ = new BehaviorSubject<number | null>(null);

  readonly registro = toSignal(
    this.id$.pipe(
      filter((id): id is number => id !== null),
      switchMap(id =>
        this.http.get<Abastecimento>(`${this.api}/${id}`).pipe(
          catchError(() => { this.error.set('Registro não encontrado.'); return of(null); }),
          finalize(() => this._loading.set(false))
        )
      )
    ),
    { initialValue: null }
  );

  carregar(id: number): void {
    this._loading.set(true);
    this.error.set(null);
    this.id$.next(id);
  }
}
