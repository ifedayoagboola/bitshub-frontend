import { Component, Input, SimpleChanges } from '@angular/core';
import { Banners, FeaturedBanner, Parallax, ParallaxBanner } from '../../../shared/interface/theme.interface';
import { ThemeParallaxBannerComponent } from '../widgets/theme-parallax-banner/theme-parallax-banner.component';

@Component({
    selector: 'app-parallax',
    imports: [ThemeParallaxBannerComponent],
    templateUrl: './parallax.component.html',
    styleUrl: './parallax.component.scss'
})
export class ParallaxComponent {

  @Input() data?: Parallax;
  @Input() slug?: string;

  public filteredBanners: ParallaxBanner[];

  ngOnChanges(change: SimpleChanges){
    this.filteredBanners = change['data']?.currentValue?.content?.parallax_banner?.banners?.filter((banner: Banners) => {
      return banner.status
    })
  }
}
