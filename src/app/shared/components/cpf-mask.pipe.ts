import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cpfMask', standalone: true })
export class CpfMaskPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value.length !== 11) return value;
    return `xxx.xxx.${value.slice(6, 9)}-${value.slice(9, 11)}`;
  }
}
