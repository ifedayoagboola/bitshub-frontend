import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-theme-parallax-banner',
    imports: [CommonModule],
    templateUrl: './theme-parallax-banner.component.html',
    styleUrl: './theme-parallax-banner.component.scss'
})
export class ThemeParallaxBannerComponent {

  @Input() banners: any;
  @Input() class: string;
  @Input() text_right: boolean = false;

  public StorageURL = environment.storageURL;
  
}
