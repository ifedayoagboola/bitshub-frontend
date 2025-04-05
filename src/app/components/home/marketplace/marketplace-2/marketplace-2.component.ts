import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngxs/store';
import { forkJoin, of } from 'rxjs';
import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';
import { FeaturedBanner, MarketplaceTwo } from '../../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../../shared/services/theme-option.service';
import { GetBrands } from '../../../../shared/store/action/brand.action';
import { GetProductByIds } from '../../../../shared/store/action/product.action';
import { ThemeBrandComponent } from '../../widgets/theme-brand/theme-brand.component';
import { ThemeFourColumnProductComponent } from '../../widgets/theme-four-column-product/theme-four-column-product.component';
import { ThemeHomeSliderComponent } from '../../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeProductComponent } from '../../widgets/theme-product/theme-product.component';
import { ThemeServicesComponent } from '../../widgets/theme-services/theme-services.component';
import { ThemeTitleComponent } from '../../widgets/theme-title/theme-title.component';

@Component({
    selector: 'app-marketplace-2',
    imports: [CommonModule, ThemeHomeSliderComponent, 
        ThemeProductComponent, ThemeTitleComponent, ThemeFourColumnProductComponent,
        ThemeServicesComponent, ImageLinkComponent, ThemeBrandComponent],
    templateUrl: './marketplace-2.component.html',
    styleUrl: './marketplace-2.component.scss'
})
export class Marketplace2Component {

  @Input() data?: MarketplaceTwo;
  @Input() slug?: string;
  private platformId: boolean;
  public banners: FeaturedBanner[];

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) platformId: Object,
    private themeOptionService: ThemeOptionService) {
    this.platformId = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.data?.slug == this.slug) {

      this.banners = [];
      if (this.data?.content?.offer_banner_1?.banner_1?.status) {
        this.banners = [...this.banners, this.data?.content?.offer_banner_1?.banner_1]
      }
      if (this.data?.content?.offer_banner_1?.banner_2?.status) {
        this.banners = [...this.banners, this.data?.content?.offer_banner_1?.banner_2]
      }
      if (this.data?.content?.offer_banner_1?.banner_3?.status) {
        this.banners = [...this.banners, this.data?.content?.offer_banner_1?.banner_3]
      }
      if (this.data?.content?.offer_banner_1?.banner_4?.status) {
        this.banners = [...this.banners, this.data?.content?.offer_banner_1?.banner_4]
      }

      // Get Products
      let getProduct$;
      if (this.data?.content?.products_ids?.length) {
        getProduct$ = this.store.dispatch(new GetProductByIds({
          status: 1,
          approve: 1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }))
      } else { getProduct$ = of(null) }


      // Get Brand
      let getBrands$;
      if (this.data?.content?.brand?.status && this.data?.content?.brand?.brand_ids) {
        getBrands$ = this.store.dispatch(new GetBrands({
          status: 1,
          ids: this.data?.content?.brand?.brand_ids?.join(',')
        }));
      } else { getBrands$ = of(null) }

      // Skeleton Loader
      if (this.platformId) {

        document.body.classList.add('skeleton-body');

        // color header class
        document.body.classList.add('header-theme-color');

        forkJoin([getProduct$, getBrands$]).subscribe({
          complete: () => {
            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        });
      }
    }
  }


  ngOnDestroy() {
    if (this.platformId) {
      document.body.classList.remove('header-theme-color');
    }
  }

}
