import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngxs/store';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { forkJoin, of } from 'rxjs';

import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';
import { ThemeBrandComponent } from '../../widgets/theme-brand/theme-brand.component';
import { ThemeHomeSliderComponent } from '../../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeProductComponent } from '../../widgets/theme-product/theme-product.component';
import { ThemeSocialMediaComponent } from '../../widgets/theme-social-media/theme-social-media.component';
import { ThemeTitleComponent } from '../../widgets/theme-title/theme-title.component';

import { ThemeOptionService } from '../../../../shared/services/theme-option.service';

import { GetCategories } from '../../../../shared/store/action/category.action';
import { GetProductByIds } from '../../../../shared/store/action/product.action';

import { Category } from '../../../../shared/interface/category.interface';
import { FeaturedBanner, FurnitureTwo } from '../../../../shared/interface/theme.interface';

import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';
import { CategoriesComponent } from '../../../../shared/components/widgets/categories/categories.component';
import { categorySlider, productSlider5 } from '../../../../shared/data/owl-carousel';
import { GetBrands } from '../../../../shared/store/action/brand.action';

@Component({
    selector: 'app-furniture-2',
    imports: [CommonModule, CarouselModule, ThemeHomeSliderComponent,
        ThemeTitleComponent, ThemeProductComponent, ImageLinkComponent,
        ThemeBrandComponent, ThemeSocialMediaComponent, CategoriesComponent, TranslateModule],
    templateUrl: './furniture-2.component.html',
    styleUrl: './furniture-2.component.scss'
})
export class Furniture2Component {

  @Input() data?: FurnitureTwo;
  @Input() slug?: string;
  private platformId: boolean;

  public categories: Category[];
  public categoryOptions = categorySlider;
  public videoType = ['mp4', 'webm', 'ogg'];
  public banners: FeaturedBanner[];
  public StorageURL = environment.storageURL;

  public productSlider5 = productSlider5;

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) platformId: Object,
    private themeOptionService: ThemeOptionService) {
    this.platformId = isPlatformBrowser(platformId);
  }

  ngOnChanges() {
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
      let getProduct$;
      if (this.data?.content?.products_ids?.length) {
        getProduct$ = this.store.dispatch(new GetProductByIds({
          status: 1,
          approve: 1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }))
      } else { getProduct$ = of(null); };

      // Get Category
      let getCategory$;
      if (this.data?.content.categories_icon_list?.status && this.data?.content.categories_icon_list?.category_ids?.length) {
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: this.data?.content.categories_icon_list.category_ids?.join(',')
        }));
      } else { getCategory$ = of(null); };

      // Get Brand
      let getBrands$;
      if (this.data?.content?.brand?.status && this.data?.content?.brand?.brand_ids?.length) {
        getBrands$ = this.store.dispatch(new GetBrands({
          status: 1,
          ids: this.data?.content?.brand?.brand_ids?.join(',')
        }));
      } else { getBrands$ = of(null); };

      // Skeleton Loader
      if (this.platformId) {

        document.body.classList.add('skeleton-body');
        // header light
        document.body.classList.add('header-style-light');

        forkJoin([getProduct$, getCategory$, getBrands$]).subscribe({
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
      document.body.classList.remove('header-style-light');
    }
  }
}


