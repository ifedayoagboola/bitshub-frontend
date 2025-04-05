import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngxs/store';
import { forkJoin, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CategoriesComponent } from '../../../shared/components/widgets/categories/categories.component';
import { productSlider, toolsCategorySlider } from '../../../shared/data/owl-carousel';
import { Tools } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { GetCategories } from '../../../shared/store/action/category.action';
import { GetProductByIds } from '../../../shared/store/action/product.action';
import { ThemeBrandComponent } from '../widgets/theme-brand/theme-brand.component';
import { ThemeHomeSliderComponent } from '../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeProductTabSectionComponent } from '../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { ThemeProductComponent } from '../widgets/theme-product/theme-product.component';
import { ThemeServicesComponent } from '../widgets/theme-services/theme-services.component';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';

@Component({
    selector: 'app-tools',
    imports: [CommonModule, ThemeHomeSliderComponent, ThemeServicesComponent,
        ThemeTitleComponent, CategoriesComponent, ThemeProductComponent,
        ThemeProductTabSectionComponent, ThemeBrandComponent],
    templateUrl: './tools.component.html',
    styleUrl: './tools.component.scss'
})

export class ToolsComponent {

  @Input() data?: Tools;
  @Input() slug?: string;
  private platformId: boolean;
  public options = toolsCategorySlider;
  public productSlider = productSlider;
  public StorageURL = environment.storageURL;
  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) platformId: Object,
    private themeOptionService: ThemeOptionService) {
    this.platformId = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.data?.slug == this.slug) {

      let categoryIds = [...new Set(this.data?.content.categories.category_ids.concat(this.data.content.category_product.right_panel.product_category.category_ids))];

      this.productSlider = {
        ...this.productSlider,
        responsive: {
          ...this.productSlider.responsive,
          999: {
            items: 5
          }
        }
      }

      // Get Products
      let getProducts$;
      if (this.data?.content?.products_ids.length && (this.data?.content?.products_list_1?.status || this.data?.content?.products_list_2?.status || this.data?.content?.category_product?.left_panel?.status)) {
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
      if (categoryIds.length && (this.data?.content.categories.category_ids || this.data?.content.category_product.right_panel.product_category.category_ids)) {
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: categoryIds?.join(',')
        }));
      } else {
        getCategory$ = of(null);
      }

      // Get Brand
      let getBrands$;
      if (this.data?.content?.brand?.brand_ids.length && this.data?.content?.brand?.status) {
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
        document.body.classList.add('tools-bg');
        forkJoin([getProducts$, getCategory$, getBrands$]).subscribe({
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
    document.body.classList.remove('tools-bg');
    }
  }
}
