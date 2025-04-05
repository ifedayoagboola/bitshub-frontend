import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngxs/store';
import { forkJoin, of } from 'rxjs';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { FeaturedBanner, Goggles } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { GetCategories } from '../../../shared/store/action/category.action';
import { GetProductByIds } from '../../../shared/store/action/product.action';
import { ThemeBrandComponent } from '../widgets/theme-brand/theme-brand.component';
import { ThemeHomeSliderComponent } from '../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeProductTabSectionComponent } from '../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { ThemeProductComponent } from '../widgets/theme-product/theme-product.component';
import { ThemeServicesComponent } from '../widgets/theme-services/theme-services.component';
import { ThemeSocialMediaComponent } from '../widgets/theme-social-media/theme-social-media.component';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';

@Component({
    selector: 'app-goggles',
    imports: [ThemeHomeSliderComponent, ThemeServicesComponent,
        ThemeTitleComponent, ThemeProductComponent,
        ThemeProductTabSectionComponent, ThemeSocialMediaComponent, ThemeBrandComponent,
        ImageLinkComponent],
    templateUrl: './goggles.component.html',
    styleUrl: './goggles.component.scss'
})
export class GogglesComponent {

  @Input() data?: Goggles;
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
      if (this.data?.content?.offer_banner?.banner_1?.status) {
        this.banners = [...this.banners, this.data?.content?.offer_banner?.banner_1]
      }
      if (this.data?.content?.offer_banner?.banner_2?.status) {
        this.banners = [...this.banners, this.data?.content?.offer_banner?.banner_2]
      }
      if (this.data?.content?.offer_banner?.banner_3?.status) {
        this.banners = [...this.banners, this.data?.content?.offer_banner?.banner_3]
      }

      // Get Products
      let getProducts$
      if (this.data?.content?.products_ids.length && this.data?.content?.products_list?.status) {
        getProducts$ = this.store.dispatch(new GetProductByIds({
          status: 1,
          approve: 1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }));
      } else {
        getProducts$ = of(null)
      }

      // Get Category
      let getCategory$
      if (this.data?.content.category_product.category_ids?.length && this.data?.content.category_product?.status) {
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: this.data?.content.category_product.category_ids?.join(',')
        }))
      } else {
        getCategory$ = of(null)
      }

      // Get Brand
      let getBrands$;
      if (this.data?.content?.brand?.brand_ids?.length && this.data?.content?.brand?.status) {
        getBrands$ = this.store.dispatch(new GetBrands({
          status: 1,
          ids: this.data?.content?.brand?.brand_ids?.join(',')
        }));
      } else {
        getBrands$ = of(null);
      }

      // Skeleton Loader
      if (this.platformId) {
        document.body.classList.add('skeleton-body');
        forkJoin([getProducts$, getCategory$, getBrands$]).subscribe({
          complete: () => {
            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        });
      }
    }
  }
}
