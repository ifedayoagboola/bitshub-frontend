import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngxs/store';
import { forkJoin, of } from 'rxjs';

import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';
import { ThemeBlogComponent } from '../../widgets/theme-blog/theme-blog.component';
import { ThemeHomeSliderComponent } from '../../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeProductComponent } from '../../widgets/theme-product/theme-product.component';
import { ThemeSocialMediaComponent } from '../../widgets/theme-social-media/theme-social-media.component';
import { ThemeTitleComponent } from '../../widgets/theme-title/theme-title.component';

import { ThemeOptionService } from '../../../../shared/services/theme-option.service';

import { FashionSix } from '../../../../shared/interface/theme.interface';

import { GetProductByIds } from '../../../../shared/store/action/product.action';

import { productSlider } from '../../../../shared/data/owl-carousel';
import { GetBlogs } from '../../../../shared/store/action/blog.action';
import { GetBrands } from '../../../../shared/store/action/brand.action';
import { ThemeBrandComponent } from '../../widgets/theme-brand/theme-brand.component';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-fashion-6',
    imports: [CommonModule, ThemeHomeSliderComponent, ImageLinkComponent,
        ThemeTitleComponent, ThemeProductComponent, ThemeBlogComponent,
        ThemeSocialMediaComponent, ThemeBrandComponent],
    templateUrl: './fashion-6.component.html',
    styleUrl: './fashion-6.component.scss'
})
export class Fashion6Component {

  @Input() data?: FashionSix;
  @Input() slug?: string;

  public options = productSlider;
  public StorageURL = environment.storageURL;
  private platformId: boolean;

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) platformId: Object,
    private themeOptionService: ThemeOptionService) {
      this.platformId = isPlatformBrowser(platformId);
  }

  ngOnChanges() {
    if(this.data?.slug == this.slug) {

      this.options = {
        ...this.options,
        responsive: {
          0: {
            items: 1,
          },
          668: {
            items: 2,
          },
          992: {
            items: 3,
          }
        }
      }

      // Get Products
      const getProducts$ = this.store.dispatch(new GetProductByIds({
        status: 1,
        approve: 1,
        ids: this.data?.content?.products_ids?.join(','),
        paginate: this.data?.content?.products_ids?.length
      }));

      // Get Brand
      const getBrands$ = this.store.dispatch(new GetBrands({
        status: 1,
        ids: this.data?.content?.brand?.brand_ids?.join(',')
      }));

      // Get Blog
      let getBlog$;
      if(this.data?.content?.featured_blogs?.blog_ids?.length && this.data?.content?.featured_blogs?.status){
        getBlog$ = this.store.dispatch(new GetBlogs({
          status: 1,
          ids: this.data?.content?.featured_blogs?.blog_ids?.join(',')
        }));
      } else { getBlog$ = of(null); }

      if(this.platformId) {
        // Skeleton Loader
        document.body.classList.add('skeleton-body');
        
        forkJoin([getProducts$, getBrands$, getBlog$]).subscribe({
          complete: () => {
            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        });
      }
    }
  }
}
