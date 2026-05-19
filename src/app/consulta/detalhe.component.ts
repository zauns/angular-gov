import { Component, ChangeDetectionStrategy, inject, input, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DetalheFacade } from './detalhe.facade';
import { CpfMaskPipe } from '../shared/components/cpf-mask.pipe';

@Component({
  selector: 'app-detalhe',
  imports: [RouterLink, CpfMaskPipe],
  templateUrl: './detalhe.component.html',
  styleUrl: './detalhe.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetalheComponent {
  id = input.required<string>();
  protected readonly facade = inject(DetalheFacade);

  constructor() {
    effect(() => this.facade.carregar(Number(this.id())));
  }
}
