import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GovHeaderComponent } from './core/components/gov-header.component';
import { MenuComponent } from './core/components/menu.component';
import { BreadcrumbComponent } from './core/components/breadcrumb.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GovHeaderComponent, MenuComponent, BreadcrumbComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {}
