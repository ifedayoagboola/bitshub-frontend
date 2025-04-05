import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { forkJoin, of } from 'rxjs';
import { CategoriesComponent } from '../../../shared/components/widgets/categories/categories.component';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { productSlider4, productSlider5 } from '../../../shared/data/owl-carousel';
import { Banners, Surfboard } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { GetCategories } from '../../../shared/store/action/category.action';
import { GetProductByIds } from '../../../shared/store/action/product.action';
import { ThemeBrandComponent } from '../widgets/theme-brand/theme-brand.component';
import { ThemeHomeSliderComponent } from '../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeProductTabSectionComponent } from '../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { ThemeProductComponent } from '../widgets/theme-product/theme-product.component';
import { ThemeSocialMediaComponent } from '../widgets/theme-social-media/theme-social-media.component';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';

@Component({
    selector: 'app-surfboard',
    imports: [CommonModule, ThemeHomeSliderComponent, ThemeTitleComponent,
        CategoriesComponent, ThemeProductComponent, ThemeProductTabSectionComponent,
        ThemeSocialMediaComponent, ThemeBrandComponent, RouterModule,
        ImageLinkComponent],
    templateUrl: './surfboard.component.html',
    styleUrl: './surfboard.component.scss'
})
export class SurfboardComponent {

  @Input() data?: Surfboard;
  @Input() slug?: string;
  private platformId: boolean;
  public productSlider5 = productSlider5;
  public productSlider4 = productSlider4;
  public banners: Banners[];

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) platformId: Object,
    private themeOptionService: ThemeOptionService) {
    this.platformId = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.data?.slug == this.slug) {

      // Get Products
      let getProducts$
      if (this.data?.content?.products_ids.length && (this.data?.content?.products_list?.status)) {
        getProducts$ = this.store.dispatch(new GetProductByIds({
          status: 1,
          approve: 1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }));
      } else {
        getProducts$ = of(null);
      }

      // Get Category
      let getCategory$;
      let categoryIds: number[] = []

      if (this.data?.content?.categories?.category_ids?.length)
        categoryIds = [...categoryIds, ...this.data?.content?.categories?.category_ids]
      if (this.data?.content?.category_product?.category_ids?.length)
        categoryIds = [...categoryIds, ...this.data?.content?.category_product?.category_ids]

      if (categoryIds?.length && (this.data?.content.categories.category_ids || this.data?.content.category_product?.status)) {
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: categoryIds?.join(',')
        }))
      } else { getCategory$ = of(null); }


      // Get Brand
      let getBrands$
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
        forkJoin([getProducts$, getCategory$]).subscribe({
          complete: () => {
            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        });
      }
    }

  }

  ngOnChanges(change: SimpleChanges) {
    this.banners = change['data']?.currentValue?.content?.offer_banner?.banners.filter((banner: Banners) => {
      return banner.status
    })
  }

}
