import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Option } from '../../../../../shared/interface/theme-option.interface';

@Component({
    selector: 'app-footer-contact',
    imports: [CommonModule, TranslateModule],
    templateUrl: './footer-contact.component.html',
    styleUrl: './footer-contact.component.scss'
})
export class FooterContactComponent {

  @Input() data: Option | null;
  @Input() icon: boolean = true;
  @Input() class: string;
  @Input() title: boolean = true;

}
