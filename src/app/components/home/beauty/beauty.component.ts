import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { forkJoin, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { VideoModalComponent } from '../../../shared/components/widgets/modal/video-modal/video-modal.component';
import { productSlider5 } from '../../../shared/data/owl-carousel';
import { Beauty } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { GetBlogs } from '../../../shared/store/action/blog.action';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { GetProductByIds } from '../../../shared/store/action/product.action';
import { ThemeBlogComponent } from '../widgets/theme-blog/theme-blog.component';
import { ThemeBrandComponent } from '../widgets/theme-brand/theme-brand.component';
import { ThemeHomeSliderComponent } from '../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeProductComponent } from '../widgets/theme-product/theme-product.component';
import { ThemeServicesComponent } from '../widgets/theme-services/theme-services.component';
import { ThemeSocialMediaComponent } from '../widgets/theme-social-media/theme-social-media.component';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';

@Component({
    selector: 'app-beauty',
    imports: [ThemeHomeSliderComponent, ThemeServicesComponent, ThemeTitleComponent,
        ThemeProductComponent, ThemeBlogComponent, ThemeSocialMediaComponent,
        ThemeBrandComponent],
    templateUrl: './beauty.component.html',
    styleUrl: './beauty.component.scss'
})
export class BeautyComponent {

  @Input() data?: Beauty;
  @Input() slug?: string;
  private platformId: boolean;
  public productSlider5 = productSlider5;
  public StorageURL = environment.storageURL;

  constructor(
    private store: Store,
    private modal: NgbModal,
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
  }

  openModal(url: string, type: string) {
    const modal = this.modal.open(VideoModalComponent, { centered: true, size: 'lg', windowClass: 'theme-modal-2' });
    modal.componentInstance.video_url = url;
    modal.componentInstance.type = type;
  }
}
