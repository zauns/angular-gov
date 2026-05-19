import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, shareReplay, catchError, finalize, defer, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Abastecimento, Uf } from '../models/abastecimento';
import { BaseFacade } from '../core/base.facade';

@Injectable({ providedIn: 'root' })
export class ConsultaFacade extends BaseFacade {
  readonly ufs: Uf[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
  readonly limite = 10;

  private readonly uf$ = new BehaviorSubject<Uf | ''>('');
  private readonly pagina$ = new BehaviorSubject(1);

  private readonly todos$ = defer(() => {
    this._loading.set(true);
    return this.http.get<Abastecimento[]>(this.api);
  }).pipe(
    catchError(() => { this.error.set('Erro ao carregar dados.'); return of([]); }),
    finalize(() => this._loading.set(false)),
    shareReplay(1)
  );

  private readonly filtrados$ = combineLatest([this.todos$, this.uf$]).pipe(
    map(([todos, uf]) => uf ? todos.filter(r => r.uf === uf) : todos),
    shareReplay(1)
  );

  readonly total = toSignal(
    this.filtrados$.pipe(map(f => f.length)),
    { initialValue: 0 }
  );

  readonly totalPaginas = toSignal(
    this.filtrados$.pipe(map(f => Math.max(1, Math.ceil(f.length / this.limite)))),
    { initialValue: 1 }
  );

  readonly items = toSignal(
    combineLatest([this.filtrados$, this.pagina$]).pipe(
      map(([filtrados, pagina]) => {
        const inicio = (pagina - 1) * this.limite;
        return filtrados.slice(inicio, inicio + this.limite);
      })
    ),
    { initialValue: [] }
  );

  readonly pagina = toSignal(this.pagina$, { initialValue: 1 });
  readonly ufSelecionada = toSignal(this.uf$, { initialValue: '' });

  filtrarPorUf(uf: Uf | ''): void {
    this.uf$.next(uf);
    this.pagina$.next(1);
  }

  anterior(): void {
    if (this.pagina$.value > 1) {
      this.pagina$.next(this.pagina$.value - 1);
    }
  }

  proximo(): void {
    if (this.pagina$.value < this.totalPaginas()) {
      this.pagina$.next(this.pagina$.value + 1);
    }
  }
}
