import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Abastecimento, Uf } from '../models/abastecimento';

@Injectable({ providedIn: 'root' })
export class ConsultaFacade {
  private readonly http = inject(HttpClient);
  private readonly api = 'api/abastecimentos';

  readonly ufSelecionada = signal<Uf | ''>('');
  readonly pagina = signal(1);
  readonly limite = 10;

  readonly items = signal<Abastecimento[]>([]);
  readonly total = signal(0);
  readonly totalPaginas = signal(1);

  readonly ufs: Uf[] = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  private todosOsRegistros: Abastecimento[] = [];

  constructor() {
    this.http.get<Abastecimento[]>(this.api).subscribe({
      next: (data) => {
        this.todosOsRegistros = data;
        this.aplicarFiltroPaginacao();
      },
      error: () => this.error.set('Erro ao carregar dados.')
    });
  }

  carregar(): void {
    this.aplicarFiltroPaginacao();
  }

  private aplicarFiltroPaginacao(): void {
    this.loading.set(true);
    this.error.set(null);

    let filtrados = [...this.todosOsRegistros];
    const uf = this.ufSelecionada();
    if (uf) {
      filtrados = filtrados.filter(r => r.uf === uf);
    }

    this.total.set(filtrados.length);
    this.totalPaginas.set(Math.max(1, Math.ceil(filtrados.length / this.limite)));

    const inicio = (this.pagina() - 1) * this.limite;
    this.items.set(filtrados.slice(inicio, inicio + this.limite));
    this.loading.set(false);
  }

  filtrarPorUf(uf: Uf | ''): void {
    this.ufSelecionada.set(uf);
    this.pagina.set(1);
    this.aplicarFiltroPaginacao();
  }

  anterior(): void {
    if (this.pagina() > 1) {
      this.pagina.update(p => p - 1);
      this.aplicarFiltroPaginacao();
    }
  }

  proximo(): void {
    if (this.pagina() < this.totalPaginas()) {
      this.pagina.update(p => p + 1);
      this.aplicarFiltroPaginacao();
    }
  }
}
