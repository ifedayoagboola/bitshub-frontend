import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngxs/store';
import { forkJoin, of } from 'rxjs';
import { CategoriesComponent } from '../../../../shared/components/widgets/categories/categories.component';
import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';
import { productSlider } from '../../../../shared/data/owl-carousel';
import { Category } from '../../../../shared/interface/category.interface';
import { ElectronicThree } from '../../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../../shared/services/theme-option.service';
import { GetBrands } from '../../../../shared/store/action/brand.action';
import { GetCategories } from '../../../../shared/store/action/category.action';
import { GetProductByIds } from '../../../../shared/store/action/product.action';
import { ThemeBrandComponent } from '../../widgets/theme-brand/theme-brand.component';
import { ThemeHomeSliderComponent } from '../../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeProductTabSectionComponent } from '../../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { ThemeProductComponent } from '../../widgets/theme-product/theme-product.component';
import { ThemeServicesComponent } from '../../widgets/theme-services/theme-services.component';

@Component({
    selector: 'app-electronic-3',
    imports: [CommonModule, ThemeHomeSliderComponent, ThemeServicesComponent,
        ThemeProductComponent, ImageLinkComponent,
        ThemeProductTabSectionComponent, ThemeBrandComponent, CategoriesComponent],
    templateUrl: './electronic-3.component.html',
    styleUrl: './electronic-3.component.scss'
})
export class Electronic3Component {

  @Input() data?: ElectronicThree;
  @Input() slug?: string;
  private platformId: boolean;
  public options = productSlider;
  public categories: Category[];

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) platformId: Object,
    private themeOptionService: ThemeOptionService) {
    this.platformId = isPlatformBrowser(platformId);
  }

  ngOnChanges() {

    if (this.data?.slug == this.slug) {

      let categoryIds = [...new Set(this.data?.content?.category_product_1?.categories?.category_ids.concat(this.data.content.category_product_2.category_ids))];

      this.options = {
        ...this.options, center: true,
        responsive: {
          ...this.options.responsive,
          999: {
            items: 5
          }
        }
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
      if (categoryIds?.length) {
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: categoryIds?.join(',')
        }));
      } else { getCategory$ = of(null); };

      // Get Brand
      let getBrands$;
      if (this.data?.content?.brand?.status && this.data?.content?.brand?.brand_ids.length) {
        getBrands$ = this.store.dispatch(new GetBrands({
          status: 1,
          ids: this.data?.content?.brand?.brand_ids?.join(',')
        }));
      } else { getBrands$ = of(null); };

      // Skeleton Loader
      if (this.platformId) {
        document.body.classList.add('skeleton-body');
        forkJoin([getProduct$, getCategory$, getBrands$]).subscribe({
          complete: () => {
            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        });
      }
    }
  }
}
