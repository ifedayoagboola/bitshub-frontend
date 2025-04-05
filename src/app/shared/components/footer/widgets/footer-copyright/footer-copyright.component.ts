import { Component, Input } from '@angular/core';
import { Option } from '../../../../interface/theme-option.interface';

@Component({
    selector: 'app-footer-copyright',
    imports: [],
    templateUrl: './footer-copyright.component.html',
    styleUrl: './footer-copyright.component.scss'
})
export class FooterCopyrightComponent {
  @Input() data: Option | null;

  getYear() {
    const year = new Date().getFullYear() % 100;
    const previousYear = (new Date().getFullYear() - 1) ; // Get last two digits of next year
    const formattedYear = `${previousYear}-${year}`;
    return formattedYear
  }
}
