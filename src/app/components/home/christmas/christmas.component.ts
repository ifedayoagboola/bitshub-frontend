import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngxs/store';
import { forkJoin, of } from 'rxjs';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { Christmas } from '../../../shared/interface/theme.interface';
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
import { ThemeSocialMediaComponent } from '../widgets/theme-social-media/theme-social-media.component';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';

@Component({
    selector: 'app-christmas',
    imports: [ThemeHomeSliderComponent, ImageLinkComponent, ThemeTitleComponent,
        ThemeProductComponent, ThemeProductTabSectionComponent, ThemeBlogComponent,
        ThemeSocialMediaComponent, ThemeBrandComponent
    ],
    templateUrl: './christmas.component.html',
    styleUrl: './christmas.component.scss'
})
export class ChristmasComponent {

  @Input() data?: Christmas;
  @Input() slug?: string;
  private platformId: boolean;

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) platformId: Object,
    public themeOptionService: ThemeOptionService) {
    this.platformId = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.data?.slug == this.slug) {

      // Get Products
      let getProducts$;
      if (this.data?.content?.products_ids.length) {
        getProducts$ = this.store.dispatch(new GetProductByIds({
          status: 1,
          approve: 1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }));
      } else {
        getProducts$ = of(null);
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

      // Get Category
      let getCategory$;
      if ((this.data?.content.category_product_1?.category_ids?.length || this.data?.content.category_product_2?.category_ids?.length) && (this.data?.content.category_product_1?.status || this.data?.content.category_product_2?.status)) {
        const categories_ids = this.data?.content.category_product_1?.category_ids?.concat(this.data?.content.category_product_2?.category_ids)
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: categories_ids?.join(',')
        }))
      } else { getCategory$ = of(null); }

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
        document.body.classList.add('christmas');
        forkJoin([getProducts$, getCategory$, getBlog$, getBrands$]).subscribe({
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
      document.body.classList.remove('christmas');
    }
  }
}
