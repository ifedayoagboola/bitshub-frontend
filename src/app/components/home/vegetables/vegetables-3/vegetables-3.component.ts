import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, Input, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, forkJoin, of } from 'rxjs';
import { CategoriesComponent } from '../../../../shared/components/widgets/categories/categories.component';
import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';
import { productSlider } from '../../../../shared/data/owl-carousel';
import { Category } from '../../../../shared/interface/category.interface';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { Banners, FeaturedBanner, VegetablesThree } from '../../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../../shared/services/theme-option.service';
import { GetBlogs } from '../../../../shared/store/action/blog.action';
import { GetBrands } from '../../../../shared/store/action/brand.action';
import { GetCategories, GetHeaderCategories } from '../../../../shared/store/action/category.action';
import { GetProductByIds } from '../../../../shared/store/action/product.action';
import { ThemeOptionState } from '../../../../shared/store/state/theme-option.state';
import { ThemeBlogComponent } from '../../widgets/theme-blog/theme-blog.component';
import { ThemeBrandComponent } from '../../widgets/theme-brand/theme-brand.component';
import { ThemeHomeSliderComponent } from '../../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeProductTabSectionComponent } from '../../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { ThemeProductComponent } from '../../widgets/theme-product/theme-product.component';
import { ThemeServicesComponent } from '../../widgets/theme-services/theme-services.component';
import { ThemeTitleComponent } from '../../widgets/theme-title/theme-title.component';

@Component({
    selector: 'app-vegetables-3',
    imports: [CommonModule, RouterModule,
        ThemeHomeSliderComponent, ThemeServicesComponent, ThemeTitleComponent,
        ThemeProductComponent, ImageLinkComponent, ThemeProductTabSectionComponent,
        ThemeBlogComponent, ThemeBrandComponent, CategoriesComponent
    ],
    templateUrl: './vegetables-3.component.html',
    styleUrl: './vegetables-3.component.scss'
})
export class Vegetables3Component {

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  @Input() data?: VegetablesThree;
  @Input() slug?: string;
  private platformId: boolean;
  public options = productSlider;
  public banners: FeaturedBanner[];
  public filteredBanners: Banners[];
  public categoryIds: number[];
  public categories: Category[];

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) platformId: Object,
    private themeOptionService: ThemeOptionService) {
    this.platformId = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.data?.slug == this.slug) {

      this.themeOption$.subscribe((value) => {
        if (value) {
          this.categoryIds = value?.header?.category_ids;
        }
      })

      //   if(this.categoryIds && this.categoryIds.length) {
      //   this.category$.subscribe((res) => {
      //     if(res){
      //       this.categories = res.data.filter(category => this.categoryIds?.includes(category.id))
      //     }
      //   })
      // }

      this.options = {
        ...this.options, responsive: {
          ...this.options.responsive,
          999: {
            items: 5
          }
        }
      }

      let categoryIds = this.data?.content?.category_product?.category_ids.concat(this.data?.content?.sidebar_category?.category_ids);

      // Get Products
      let getProduct$
      if (this.data?.content?.products_ids?.length) {
        getProduct$ = this.store.dispatch(new GetProductByIds({
          status: 1,
          approve: 1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }))
      } else {
        getProduct$ = of(null)
      }

      // Get Category
      let getCategory$
      if (categoryIds?.length) {
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: categoryIds?.join(',')
        }))
      } else {
        getCategory$ = of(null)
      }

      // Get Category
      this.store.dispatch(new GetHeaderCategories({
        status: 1,
        ids: this.categoryIds?.join(',')
      }))

      // Get Blog
      let getBlogs$
      if (this.data?.content?.featured_blogs.blog_ids.length && this.data?.content?.featured_blogs?.status) {
        getBlogs$ = this.store.dispatch(new GetBlogs({
          status: 1,
          ids: this.data?.content.featured_blogs.blog_ids?.join(',')
        }));
      } else {
        getBlogs$ = of(null)
      }

      // Get Brand
      let getBrands$
      if (this.data?.content?.brand?.brand_ids.length && this.data?.content?.brand?.status) {
        getBrands$ = this.store.dispatch(new GetBrands({
          status: 1,
          ids: this.data?.content?.brand?.brand_ids?.join(',')
        }));
      } else {
        getBrands$ = of(null)
      }

      // Skeleton Loader
      if (this.platformId) {
        document.body.classList.add('skeleton-body');
        document.body.classList.add('having-sidemenu');
        forkJoin([getProduct$, getCategory$, getBlogs$, getBrands$]).subscribe({
          complete: () => {
            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        });
      }
    }
  }

  ngOnChanges(change: SimpleChanges) {
    if (change['data'] && change['data'].currentValue) {
      this.filteredBanners = change['data']?.currentValue?.content?.banner?.banners?.filter((banner: Banners) => {
        return banner.status
      })
    }
  }

  ngOnDestroy() {
    if (this.platformId) {
      document.body.classList.remove('having-sidemenu');
    }
  }
}

