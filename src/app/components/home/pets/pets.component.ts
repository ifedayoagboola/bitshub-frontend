import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { Store } from '@ngxs/store';
import { forkJoin, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { Banners, Pets } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { GetBlogs } from '../../../shared/store/action/blog.action';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { GetProductByIds } from '../../../shared/store/action/product.action';
import { ThemeBlogComponent } from '../widgets/theme-blog/theme-blog.component';
import { ThemeBrandComponent } from '../widgets/theme-brand/theme-brand.component';
import { ThemeHomeSliderComponent } from '../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeProductComponent } from '../widgets/theme-product/theme-product.component';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';

@Component({
    selector: 'app-pets',
    imports: [CommonModule, ThemeHomeSliderComponent, ThemeBrandComponent,
        ImageLinkComponent, ThemeTitleComponent, ThemeProductComponent,
        ThemeBlogComponent],
    templateUrl: './pets.component.html',
    styleUrl: './pets.component.scss'
})
export class PetsComponent {

  @Input() data?: Pets;
  @Input() slug?: string;
  private platformId: boolean;
  public filteredBanners: Banners[];
  public StorageURL = environment.storageURL;

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
      if (this.data?.content?.products_ids.length && (this.data?.content?.products_list_1?.status || this.data?.content?.products_list_2?.status)) {
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

      // Get Brand
      let getBrands$
      if (this.data?.content?.brand?.brand_ids.length && this.data?.content?.brand.status) {
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
        forkJoin([getProducts$, getBlog$, getBrands$]).subscribe({
          complete: () => {
            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        });
      }
    }

    // header light
    if (this.platformId) {
      document.body.classList.add('header-style-light');
    }
  }

  ngOnChanges(change: SimpleChanges) {
    this.filteredBanners = change['data']?.currentValue?.content?.offer_banner?.banners.filter((banner: Banners) => {
      return banner.status
    })
  }

  ngOnDestroy() {
    if (this.platformId) {
      document.body.classList.remove('header-style-light');
    }
  }

}
