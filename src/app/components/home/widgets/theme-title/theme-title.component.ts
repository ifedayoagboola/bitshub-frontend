import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-theme-title',
    imports: [CommonModule],
    templateUrl: './theme-title.component.html',
    styleUrl: './theme-title.component.scss'
})
export class ThemeTitleComponent {

  @Input() title: any;
  @Input() type: string;
  @Input() textWhite: boolean = false;
  @Input() space: boolean = true;
  @Input() class: string;

  getTitle(value: string) {
    const text = value.split(' ');

    const firstWord = text.slice(0,3).join(' ');
    const remainingWord = text.slice(3).join(' ');
    return `<h4>${firstWord} <span class="gradient-text">${remainingWord}</span></h4>`

  }

}
