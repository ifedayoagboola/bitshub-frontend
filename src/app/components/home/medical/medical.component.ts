import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { Store } from '@ngxs/store';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { forkJoin, of } from 'rxjs';
import { CategoriesComponent } from '../../../shared/components/widgets/categories/categories.component';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { categorySlider } from '../../../shared/data/owl-carousel';
import { Category } from '../../../shared/interface/category.interface';
import { Banners, Medical } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { GetBlogs } from '../../../shared/store/action/blog.action';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { GetCategories } from '../../../shared/store/action/category.action';
import { GetProductByIds } from '../../../shared/store/action/product.action';
import { ThemeBlogComponent } from '../widgets/theme-blog/theme-blog.component';
import { ThemeBrandComponent } from '../widgets/theme-brand/theme-brand.component';
import { ThemeHomeSliderComponent } from '../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeProductTabSectionComponent } from '../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { ThemeProductComponent } from '../widgets/theme-product/theme-product.component';
import { ThemeServicesComponent } from '../widgets/theme-services/theme-services.component';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';

@Component({
    selector: 'app-medical',
    imports: [CommonModule, ThemeHomeSliderComponent, CarouselModule,
        CategoriesComponent, ThemeTitleComponent, ThemeProductTabSectionComponent,
        ThemeProductComponent, ThemeBlogComponent,
        ThemeServicesComponent, ThemeBrandComponent, ImageLinkComponent],
    templateUrl: './medical.component.html',
    styleUrl: './medical.component.scss'
})
export class MedicalComponent {

  @Input() data?: Medical;
  @Input() slug?: string;
  private platformId: boolean;
  public categories: Category[];
  public options = categorySlider;
  public filteredBanners: Banners[];

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) platformId: Object,
    private themeOptionService: ThemeOptionService) {
    this.platformId = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.data?.slug == this.slug) {

      let category = [...new Set(this.data?.content.categories.category_ids.concat(this.data.content.category_product.category_ids))]

      // Get Products
      let getProducts$;
      if (this.data?.content?.products_ids.length && (this.data?.content?.column_banner_product?.product_list_1?.status || this.data?.content?.column_banner_product?.product_list_2?.status)) {
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
      if (category.length && (this.data?.content?.categories?.status || this.data?.content?.category_product?.status)) {
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: category?.join(',')
        }));
      } else {
        getCategory$ = of(null);
      }

      // Get Blog
      let getBlog$;
      if (this.data?.content?.featured_blogs?.blog_ids?.length && this.data?.content?.featured_blogs?.status) {
        getBlog$ = this.store.dispatch(new GetBlogs({
          status: 1,
          ids: this.data?.content?.featured_blogs?.blog_ids?.join(',')
        }));
      } else {
        getBlog$ = of(null);
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
        forkJoin([getProducts$, getCategory$, getBrands$]).subscribe({
          complete: () => {
            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        });
      }
    }
    if (this.platformId) {
      document.body.classList.add('theme-color-22');
    }
    this.themeOptionService.theme_color = '#38c6bb';
  }

  ngOnChanges(change: SimpleChanges) {
    this.filteredBanners = change['data']?.currentValue?.content?.offer_banner?.banners?.filter((banner: Banners) => {
      return banner.status
    })
  }
  ngOnDestroy() {
    // Remove Class
    if (this.platformId) {
      document.body.classList.remove('theme-color-22');
    }
  }
}
