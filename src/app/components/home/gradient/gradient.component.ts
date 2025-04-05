import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, Input, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, forkJoin, of } from 'rxjs';
import { CategoriesComponent } from '../../../shared/components/widgets/categories/categories.component';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { blogSlider4, productSlider5 } from '../../../shared/data/owl-carousel';
import { CouponModel } from '../../../shared/interface/coupon.interface';
import { Banners, Gradient } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { GetBlogs } from '../../../shared/store/action/blog.action';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { GetCategories } from '../../../shared/store/action/category.action';
import { GetCoupons } from '../../../shared/store/action/coupon.action';
import { GetProductByIds } from '../../../shared/store/action/product.action';
import { CouponState } from '../../../shared/store/state/coupon.state';
import { ThemeBlogComponent } from '../widgets/theme-blog/theme-blog.component';
import { ThemeBrandComponent } from '../widgets/theme-brand/theme-brand.component';
import { ThemeHomeSliderComponent } from '../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeParallaxBannerComponent } from '../widgets/theme-parallax-banner/theme-parallax-banner.component';
import { ThemeProductTabSectionComponent } from '../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { ThemeProductComponent } from '../widgets/theme-product/theme-product.component';
import { ThemeSocialMediaComponent } from '../widgets/theme-social-media/theme-social-media.component';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';

@Component({
    selector: 'app-gradient',
    imports: [CommonModule, CarouselModule, ThemeHomeSliderComponent, CategoriesComponent,
        ImageLinkComponent, ThemeTitleComponent, ThemeProductTabSectionComponent,
        ThemeProductComponent, ThemeParallaxBannerComponent, ThemeBlogComponent,
        ThemeSocialMediaComponent, ThemeBrandComponent
    ],
    templateUrl: './gradient.component.html',
    styleUrl: './gradient.component.scss'
})
export class GradientComponent {

  @Input() data?: Gradient;
  @Input() slug?: string;
  private platformId: boolean;

  coupon$: Observable<CouponModel> = inject(Store).select(CouponState.coupon);

  public productSlider5 = productSlider5;
  public blogSlider4 = blogSlider4;

  public images = [
    'assets/images/gradient/deal-bg/1.jpg',
    'assets/images/gradient/deal-bg/2.jpg',
    'assets/images/gradient/deal-bg/3.jpg',
    'assets/images/gradient/deal-bg/4.jpg',
    'assets/images/gradient/deal-bg/5.jpg',
    'assets/images/gradient/deal-bg/6.jpg'
  ]

  public options: OwlOptions = {
    loop: true,
    nav: false,
    dots: false,
    margin: 24,
    responsive: {
      0: {
        items: 2,
        margin: 12,
      },
      600: {
        items: 3,
        margin: 12,
      },
      700: {
        items: 4
      },
      1050: {
        items: 5
      },
      1296: {
        items: 6
      }
    }
  }

  public filteredBanners: Banners[];

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) platformId: Object,
    private themeOptionService: ThemeOptionService) {
    this.platformId = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.data?.slug == this.slug) {

      this.store.dispatch(new GetCoupons({ status: 1 }))

      let categoryIds = this.data?.content?.category_product?.category_ids.concat(this.data?.content?.categories_1?.category_ids);

      // Get Products
      let getProducts$
      if (this.data?.content?.products_ids?.length) {
        getProducts$ = this.store.dispatch(new GetProductByIds({
          status: 1,
          approve: 1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }));
      } else { getProducts$ = of(null); }

      // Get Brand
      let getBrands$;
      if (this.data?.content?.brand?.brand_ids?.length && this.data?.content?.brand?.status) {
        getBrands$ = this.store.dispatch(new GetBrands({
          status: 1,
          ids: this.data?.content?.brand?.brand_ids?.join(',')
        }));
      } else { getBrands$ = of(null); }

      // Get Category
      let getCategory$;
      if (categoryIds?.length) {
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: categoryIds?.join(',')
        }))
      } else { getCategory$ = of(null); }

      // Get Blog
      let getBlog$;
      if (this.data?.content?.featured_blogs?.blog_ids?.length && this.data?.content?.featured_blogs?.status) {
        getBlog$ = this.store.dispatch(new GetBlogs({
          status: 1,
          ids: this.data?.content?.featured_blogs?.blog_ids?.join(',')
        }));
      } else { getBlog$ = of(null); }

      // Skeleton Loader
      if (this.platformId) {
        document.body.classList.add('skeleton-body');
        forkJoin([getProducts$, getCategory$, getBrands$, getBlog$]).subscribe({
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
      this.filteredBanners = change['data']?.currentValue?.content?.offer_banner?.banners?.filter((banner: Banners) => {
        return banner.status
      })
    }
  }

}
