import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { forkJoin, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { VideoModalComponent } from '../../../shared/components/widgets/modal/video-modal/video-modal.component';
import { productSlider4, toolsCategorySlider } from '../../../shared/data/owl-carousel';
import { Category } from '../../../shared/interface/category.interface';
import { Banners, FeaturedBanner, SingleProduct, TestimonialBanner } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { GetProductByIds } from '../../../shared/store/action/product.action';
import { ThemeBrandComponent } from '../widgets/theme-brand/theme-brand.component';
import { ThemeProductComponent } from '../widgets/theme-product/theme-product.component';
import { ThemeSocialMediaComponent } from '../widgets/theme-social-media/theme-social-media.component';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';

@Component({
    selector: 'app-single-product',
    imports: [CommonModule, ImageLinkComponent,
        ThemeTitleComponent, ThemeProductComponent,
        ThemeSocialMediaComponent, ThemeBrandComponent, ButtonComponent
    ],
    templateUrl: './single-product.component.html',
    styleUrl: './single-product.component.scss'
})
export class SingleProductComponent {

  @Input() data?: SingleProduct;
  @Input() slug?: string;
  private platformId: boolean;

  public category: Category[];
  public banners: FeaturedBanner[];
  public options = toolsCategorySlider;
  public productSlider4 = productSlider4;
  public filteredServices: Banners[];
  public filteredTestimonial: TestimonialBanner[];
  public singleProductIds: number[] = []
  public StorageURL = environment.storageURL;

  constructor(
    private store: Store,
    private themeOptionService: ThemeOptionService,
    private modal: NgbModal,
    @Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = isPlatformBrowser(platformId);
  }

  ngOnChanges(change: SimpleChanges) {
    if (this.data?.slug == this.slug) {

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
        forkJoin([getProducts$, getBrands$]).subscribe({
          complete: () => {
            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        });
      }

      this.filteredServices = change['data']?.currentValue?.content?.services?.right_panel?.banners?.filter((banner: Banners) => {
        return banner.status
      })

      this.filteredTestimonial = change['data']?.currentValue?.content?.testimonial?.banners?.filter((banner: Banners) => {
        return banner.status
      })

      const productId = this.data?.content?.single_product?.product_ids;
      this.singleProductIds = Array.isArray(productId) ? productId : (productId !== undefined ? [productId] : []);
    }
  }

  ngOnInit() {
    if (this.platformId) {
    document.body.classList.add('single-product');
    }
  }

  getText(value: string) {
    const text = value.split(' ');

    const firstWord = text.slice(0, 3).join(' ');
    const remainingWord = text.slice(3).join(' ');
    return `<h1>${firstWord} <span>${remainingWord}</span></h1>`

  }

  openModal(url: string, type: string) {
    const modal = this.modal.open(VideoModalComponent, { centered: true, size: 'lg', windowClass: 'theme-modal-2' });
    modal.componentInstance.video_url = url;
    modal.componentInstance.type = type;
  }

  ngOnDestroy() {
    if (this.platformId) {
    document.body.classList.remove('single-product');
    }
  }
}
