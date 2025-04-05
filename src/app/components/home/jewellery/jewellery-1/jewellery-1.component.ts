import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngxs/store';
import { forkJoin, of } from 'rxjs';
import { CategoriesComponent } from '../../../../shared/components/widgets/categories/categories.component';
import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';
import { JewelleryCategorySlider, categorySlider } from '../../../../shared/data/owl-carousel';
import { Category } from '../../../../shared/interface/category.interface';
import { JewelryOne } from '../../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../../shared/services/theme-option.service';
import { GetBrands } from '../../../../shared/store/action/brand.action';
import { GetCategories } from '../../../../shared/store/action/category.action';
import { GetProductByIds } from '../../../../shared/store/action/product.action';
import { ThemeBrandComponent } from '../../widgets/theme-brand/theme-brand.component';
import { ThemeHomeSliderComponent } from '../../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeParallaxBannerComponent } from '../../widgets/theme-parallax-banner/theme-parallax-banner.component';
import { ThemeProductTabSectionComponent } from '../../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { ThemeProductComponent } from '../../widgets/theme-product/theme-product.component';
import { ThemeServicesComponent } from '../../widgets/theme-services/theme-services.component';
import { ThemeSocialMediaComponent } from '../../widgets/theme-social-media/theme-social-media.component';
import { ThemeTitleComponent } from '../../widgets/theme-title/theme-title.component';

@Component({
    selector: 'app-jewellery-1',
    imports: [ThemeHomeSliderComponent, CategoriesComponent, ThemeTitleComponent,
        ThemeProductComponent, ThemeServicesComponent,
        ThemeProductTabSectionComponent, ThemeSocialMediaComponent, ThemeBrandComponent,
        ImageLinkComponent
    ],
    templateUrl: './jewellery-1.component.html',
    styleUrl: './jewellery-1.component.scss'
})

export class Jewellery1Component {

  private platformId: boolean;
  @Input() data?: JewelryOne;
  @Input() slug?: string;
  public categories: Category[];
  public categories2: Category[];
  public options = categorySlider;
  public categorySlider = JewelleryCategorySlider;

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) platformId: Object,
    private themeOptionService: ThemeOptionService) {
    this.platformId = isPlatformBrowser(platformId);
  }

  ngOnChanges() {
    if (this.data?.slug == this.slug) {
      let categoryIds = this.data?.content.categories.category_ids.concat(this.data?.content.category_product.category_ids)
      // Get Products
      let getProduct$;
      if (this.data?.content?.products_ids.length) {
        getProduct$ = this.store.dispatch(new GetProductByIds({
          status: 1,
          approve: 1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }))
      } else {
        getProduct$ = of(null);
      }

      // Get Category
      let getCategory$;
      if (categoryIds?.length) {
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: categoryIds?.join(',')
        }));
      } else {
        getCategory$ = of(null);
      }

      // Get Brand
      let getBrands$;
      if (this.data?.content?.brand?.brand_ids.length) {
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
        document.body.classList.add('bg_cls');
        forkJoin([getProduct$, getCategory$, getBrands$]).subscribe({
          complete: () => {
            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        })
      }
    }
  }

  ngOnDestroy() {
    if (this.platformId) {
      document.body.classList.remove('bg_cls');
    }
  }
}
