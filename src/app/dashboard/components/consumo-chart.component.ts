import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData } from 'chart.js';
import { ConsumoPorUf } from '../../models/abastecimento';

@Component({
  selector: 'app-consumo-chart',
  imports: [BaseChartDirective],
  templateUrl: './consumo-chart.component.html',
  styleUrl: './consumo-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsumoChartComponent {
  readonly data = input.required<ConsumoPorUf[]>();

  protected readonly chartData = computed<ChartData<'bar'>>(() => {
    const dados = this.data();
    return {
      labels: dados.map(d => d.uf),
      datasets: [{
        label: 'Litros',
        data: dados.map(d => d.litros),
        backgroundColor: dados.map(() => '#1351B4'),
        borderRadius: 4,
        borderSkipped: false
      }]
    };
  });

  protected readonly chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: { raw: unknown }) =>
            `${(ctx.raw as number).toLocaleString('pt-BR')} L`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (v: string | number) =>
            `${(v as number).toLocaleString('pt-BR')} L`
        }
      }
    }
  } as const;
}
