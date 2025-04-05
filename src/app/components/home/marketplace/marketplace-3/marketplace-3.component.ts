import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngxs/store';
import { forkJoin, of } from 'rxjs';
import { CategoriesComponent } from '../../../../shared/components/widgets/categories/categories.component';
import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';
import { FeaturedBanner, MarketplaceThree } from '../../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../../shared/services/theme-option.service';
import { GetBlogs } from '../../../../shared/store/action/blog.action';
import { GetBrands } from '../../../../shared/store/action/brand.action';
import { GetCategories } from '../../../../shared/store/action/category.action';
import { GetProductByIds } from '../../../../shared/store/action/product.action';
import { ThemeBannerComponent } from '../../widgets/theme-banner/theme-banner.component';
import { ThemeBlogComponent } from '../../widgets/theme-blog/theme-blog.component';
import { ThemeBrandComponent } from '../../widgets/theme-brand/theme-brand.component';
import { ThemeHomeSliderComponent } from '../../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeProductTabSectionComponent } from '../../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { ThemeProductComponent } from '../../widgets/theme-product/theme-product.component';
import { ThemeTitleComponent } from '../../widgets/theme-title/theme-title.component';

@Component({
    selector: 'app-marketplace-3',
    imports: [ThemeHomeSliderComponent, ThemeBannerComponent, CategoriesComponent,
        ThemeProductComponent, ImageLinkComponent, ThemeTitleComponent,
        ThemeProductTabSectionComponent, ThemeBlogComponent, ThemeBrandComponent],
    templateUrl: './marketplace-3.component.html',
    styleUrl: './marketplace-3.component.scss'
})
export class Marketplace3Component {

  @Input() data?: MarketplaceThree;
  @Input() slug?: string;
  public banners: FeaturedBanner[];
  private platformId: boolean;

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) platformId: Object,
    private themeOptionService: ThemeOptionService) {
    this.platformId = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.data?.slug == this.slug) {
      let categoryIds = this.data?.content?.categories_products?.left_panel?.categories?.category_ids;

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
      let getProduct$
      if (this.data?.content?.products_ids?.length) {
        getProduct$ = this.store.dispatch(new GetProductByIds({
          status: 1,
          approve: 1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }))
      } else { getProduct$ = of(null) }

      // Get Category
      let getCategory$
      if (categoryIds?.length) {
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: categoryIds?.join(',')
        }))
      } else { getCategory$ = of(null) }

      // Get Blog
      let getBlogs$
      if (this.data?.content?.featured_blogs.blog_ids.length && this.data?.content?.featured_blogs?.status) {
        getBlogs$ = this.store.dispatch(new GetBlogs({
          status: 1,
          ids: this.data?.content.featured_blogs.blog_ids?.join(',')
        }));
      } else { getBlogs$ = of(null) }

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

        forkJoin([getProduct$, getCategory$, getBlogs$, getBrands$]).subscribe({
          complete: () => {
            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        });
      }
    }
  }
}
