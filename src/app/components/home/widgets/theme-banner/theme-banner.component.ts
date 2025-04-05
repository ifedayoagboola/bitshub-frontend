import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';

@Component({
    selector: 'app-theme-banner',
    imports: [CommonModule, ImageLinkComponent],
    templateUrl: './theme-banner.component.html',
    styleUrl: './theme-banner.component.scss'
})
export class ThemeBannerComponent {

  @Input() banners: any;
  @Input() class: string;

}
