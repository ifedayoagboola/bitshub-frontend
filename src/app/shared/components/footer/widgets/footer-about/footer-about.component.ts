import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Option } from '../../../../../shared/interface/theme-option.interface';

@Component({
    selector: 'app-footer-about',
    imports: [CommonModule],
    templateUrl: './footer-about.component.html',
    styleUrl: './footer-about.component.scss'
})
export class FooterAboutComponent {

  @Input() data: Option | null;

}
