import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { homeBannerSlider } from '../../../../shared/data/owl-carousel';

import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';
import { Banners } from '../../../../shared/interface/theme.interface';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-theme-home-slider',
    imports: [CommonModule, RouterModule, CarouselModule, ImageLinkComponent],
    templateUrl: './theme-home-slider.component.html',
    styleUrl: './theme-home-slider.component.scss'
})
export class ThemeHomeSliderComponent {

  @Input() banners: any;
  @Input() theme: string;

  public options = homeBannerSlider;
  public filteredBanners: Banners[];
  public videoType = ['mp4', 'webm', 'ogg'];
  public StorageURL = environment.storageURL
  
  ngOnChanges(change: SimpleChanges){
    this.filteredBanners = change['banners'].currentValue?.banners?.filter((banner: Banners) => {
      return banner.status
    })
  }
}
