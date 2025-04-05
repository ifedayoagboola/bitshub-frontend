import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Option } from '../../../../../shared/interface/theme-option.interface';

@Component({
    selector: 'app-footer-social-links',
    imports: [CommonModule],
    templateUrl: './footer-social-links.component.html',
    styleUrl: './footer-social-links.component.scss'
})
export class FooterSocialLinksComponent {

  @Input() data: Option | null;

}
