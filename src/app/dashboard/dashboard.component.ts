import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DashboardFacade } from './dashboard.facade';
import { KpiCardComponent } from '../shared/components/kpi-card.component';
import { ConsumoChartComponent } from './components/consumo-chart.component';

@Component({
  selector: 'app-dashboard',
  imports: [KpiCardComponent, ConsumoChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  private readonly facade = inject(DashboardFacade);

  protected readonly kpis = this.facade.kpis;
  protected readonly consumoPorUf = this.facade.consumoPorUf;
  protected readonly loading = this.facade.loading;
}
