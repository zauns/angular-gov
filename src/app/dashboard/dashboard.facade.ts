import { Injectable } from '@angular/core';
import { combineLatest, map, shareReplay, catchError, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Abastecimento, Kpi, ConsumoPorUf, Uf } from '../models/abastecimento';
import { BaseFacade } from '../core/base.facade';

@Injectable({ providedIn: 'root' })
export class DashboardFacade extends BaseFacade {
  private readonly todos$ = this.http.get<Abastecimento[]>(this.api).pipe(
    catchError(() => { this.error.set('Erro ao carregar dados.'); return of([]); }),
    shareReplay(1)
  );

  private readonly gasolina$ = this.http.get<Abastecimento[]>(`${this.api}?tipo=Gasolina`).pipe(
    catchError(() => { this.error.set('Erro ao carregar dados.'); return of([]); }),
    shareReplay(1)
  );

  private readonly etanol$ = this.http.get<Abastecimento[]>(`${this.api}?tipo=Etanol`).pipe(
    catchError(() => { this.error.set('Erro ao carregar dados.'); return of([]); }),
    shareReplay(1)
  );

  private readonly diesel$ = this.http.get<Abastecimento[]>(`${this.api}?tipo=Diesel`).pipe(
    catchError(() => { this.error.set('Erro ao carregar dados.'); return of([]); }),
    shareReplay(1)
  );

  readonly kpis = toSignal(
    combineLatest([this.gasolina$, this.etanol$, this.diesel$, this.todos$]).pipe(
      map(([gasolina, etanol, diesel, todos]) => {
        const media = (items: Abastecimento[]) =>
          items.length ? items.reduce((sum, i) => sum + i.valorLitro, 0) / items.length : 0;

        const totalLitros = todos.reduce((sum, i) => sum + i.litros, 0);

        return [
          {
            titulo: 'Preço Médio Gasolina',
            valor: `R$ ${media(gasolina).toFixed(2)}`,
            icone: 'gasolina',
            cor: '#E20000'
          },
          {
            titulo: 'Preço Médio Etanol',
            valor: `R$ ${media(etanol).toFixed(2)}`,
            icone: 'etanol',
            cor: '#00BC16'
          },
          {
            titulo: 'Preço Médio Diesel',
            valor: `R$ ${media(diesel).toFixed(2)}`,
            icone: 'diesel',
            cor: '#0C3D8A'
          },
          {
            titulo: 'Total de Litros Consumidos',
            valor: totalLitros.toLocaleString('pt-BR') + ' L',
            icone: 'litros',
            cor: '#2200BC'
          }
        ] satisfies Kpi[];
      })
    ),
    { initialValue: [] }
  );

  readonly consumoPorUf = toSignal(
    this.todos$.pipe(
      map((todos) => {
        const ufs: Uf[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
        return ufs.map((uf) => ({
          uf,
          litros: todos.filter(i => i.uf === uf).reduce((sum, i) => sum + i.litros, 0)
        })) satisfies ConsumoPorUf[];
      })
    ),
    { initialValue: [] }
  );

  // Derived from combineLatest — starts true, becomes false when all sources emit
  override readonly loading = toSignal(
    combineLatest([this.gasolina$, this.etanol$, this.diesel$, this.todos$]).pipe(
      map(() => false)
    ),
    { initialValue: true }
  );
}
