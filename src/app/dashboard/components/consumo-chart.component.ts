import { Component, ChangeDetectionStrategy, input, computed, effect, viewChild, ElementRef } from '@angular/core';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { ConsumoPorUf } from '../../models/abastecimento';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

@Component({
  selector: 'app-consumo-chart',
  imports: [],
  templateUrl: './consumo-chart.component.html',
  styleUrl: './consumo-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsumoChartComponent {
  readonly data = input.required<ConsumoPorUf[]>();

  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('canvas');
  private chart?: Chart<'bar'>;

  constructor() {
    effect(() => {
      const canvas = this.canvas();
      const dados = this.data();
      if (!canvas || !dados.length) return;

      if (this.chart) this.chart.destroy();

      this.chart = new Chart(canvas.nativeElement, {
        type: 'bar',
        data: {
          labels: dados.map(d => d.uf),
          datasets: [{
            label: 'Litros',
            data: dados.map(d => d.litros),
            backgroundColor: dados.map(() => '#1351B4'),
            borderRadius: 4,
            borderSkipped: false
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) => `${(ctx.raw as number).toLocaleString('pt-BR')} L`
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (v) => `${(v as number).toLocaleString('pt-BR')} L`
              }
            }
          }
        }
      });
    });
  }
}
