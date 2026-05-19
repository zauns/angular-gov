import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, combineLatest } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Abastecimento, Kpi, ConsumoPorUf, Combustivel, Uf } from '../models/abastecimento';

@Injectable({ providedIn: 'root' })
export class DashboardFacade {
  private readonly http = inject(HttpClient);
  private readonly api = 'api/abastecimentos';

  private readonly todos$ = this.http.get<Abastecimento[]>(this.api);
  private readonly gasolina$ = this.http.get<Abastecimento[]>(`${this.api}?tipo=Gasolina`);
  private readonly diesel$ = this.http.get<Abastecimento[]>(`${this.api}?tipo=Diesel`);

  readonly kpis = toSignal(
    combineLatest([this.gasolina$, this.diesel$, this.todos$]).pipe(
      map(([gasolina, diesel, todos]) => {
        const media = (items: Abastecimento[]) =>
          items.reduce((sum, i) => sum + i.valorLitro, 0) / items.length;

        const totalLitros = todos.reduce((sum, i) => sum + i.litros, 0);

        return [
          {
            titulo: 'Preço Médio Nacional',
            valor: `R$ ${media(gasolina).toFixed(2)}`,
            icone: 'gasolina',
            cor: '#1351B4'
          },
          {
            titulo: 'Preço Médio Nacional',
            valor: `R$ ${media(diesel).toFixed(2)}`,
            icone: 'diesel',
            cor: '#0C3D8A'
          },
          {
            titulo: 'Total de Litros Consumidos',
            valor: totalLitros.toLocaleString('pt-BR') + ' L',
            icone: 'litros',
            cor: '#168821'
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

  readonly loading = toSignal(
    combineLatest([this.gasolina$, this.diesel$, this.todos$]).pipe(
      map(() => false)
    ),
    { initialValue: true }
  );
}
