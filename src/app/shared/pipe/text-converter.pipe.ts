import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textConverter',
  standalone: true
})
export class TextConverterPipe implements PipeTransform {

  transform(value: string) {
    if (!value) return ''; // Handle edge cases like empty or undefined filters

  return value.split(/[-_]/)
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
  }

}
