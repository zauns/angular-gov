import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConsultaFacade } from './consulta.facade';

@Component({
  selector: 'app-consulta',
  imports: [RouterLink, FormsModule],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultaComponent {
  protected readonly facade = inject(ConsultaFacade);
}
