import { Component, Input } from '@angular/core';
import { Link } from '../../../../interface/theme-option.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-footer-links',
    imports: [CommonModule, RouterModule],
    templateUrl: './footer-links.component.html',
    styleUrl: './footer-links.component.scss'
})
export class FooterLinksComponent {

  @Input() links: Link[] = [];
}
