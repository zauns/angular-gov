import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-kpi-card',
  imports: [],
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KpiCardComponent {
  readonly titulo = input.required<string>();
  readonly valor = input.required<string>();
  readonly cor = input('#1351B4');
}
