import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'gov-header',
  imports: [NgOptimizedImage],
  templateUrl: './gov-header.component.html',
  styleUrl: './gov-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GovHeaderComponent {}
