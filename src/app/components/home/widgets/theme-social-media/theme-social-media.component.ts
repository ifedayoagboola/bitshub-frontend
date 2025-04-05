import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


import { Banners } from '../../../../shared/interface/theme.interface';
import { ThemeTitleComponent } from '../theme-title/theme-title.component';
import { SocialMediaSlider } from '../../../../shared/data/owl-carousel';
import { NoDataComponent } from '../../../../shared/components/widgets/no-data/no-data.component';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-theme-social-media',
    imports: [CommonModule, CarouselModule, ThemeTitleComponent, NoDataComponent],
    templateUrl: './theme-social-media.component.html',
    styleUrl: './theme-social-media.component.scss'
})
export class ThemeSocialMediaComponent {

  @Input() media: any;
  @Input() title: string;
  @Input() options: OwlOptions = SocialMediaSlider;
  @Input() class: string;
  @Input() type: string;

  public StorageURL = environment.storageURL;

}
