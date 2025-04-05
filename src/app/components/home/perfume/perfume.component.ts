import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngxs/store';
import { forkJoin, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { ImageLinkComponent } from '../../../shared/components/widgets/image-link/image-link.component';
import { productSlider } from '../../../shared/data/owl-carousel';
import { FeaturedBanner, Perfume } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { GetBrands } from '../../../shared/store/action/brand.action';
import { GetCategories } from '../../../shared/store/action/category.action';
import { GetProductByIds } from '../../../shared/store/action/product.action';
import { ThemeBrandComponent } from '../widgets/theme-brand/theme-brand.component';
import { ThemeProductTabSectionComponent } from '../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { ThemeProductComponent } from '../widgets/theme-product/theme-product.component';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';

@Component({
    selector: 'app-perfume',
    imports: [CommonModule, ThemeTitleComponent,
        ThemeProductTabSectionComponent, ThemeProductComponent, ThemeBrandComponent,
        ImageLinkComponent, ButtonComponent],
    templateUrl: './perfume.component.html',
    styleUrl: './perfume.component.scss'
})
export class PerfumeComponent {

  @Input() data?: Perfume;
  @Input() slug?: string;
  private platformId: boolean;
  public options = productSlider;
  public banners: FeaturedBanner[];
  public StorageURL = environment.storageURL;

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) platformId: Object,
    public themeOptionService: ThemeOptionService) {
    this.platformId = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.data?.slug == this.slug) {

      this.banners = [];
      if (this.data?.content?.offer_banner_1?.banner_1?.status) {
        this.banners = [...this.banners, this.data?.content?.offer_banner_1?.banner_1]
      }
      if (this.data?.content?.offer_banner_1?.banner_2?.status) {
        this.banners = [...this.banners, this.data?.content?.offer_banner_1?.banner_2]
      }
      if (this.data?.content?.offer_banner_1?.banner_3?.status) {
        this.banners = [...this.banners, this.data?.content?.offer_banner_1?.banner_3]
      }
      if (this.data?.content?.offer_banner_1?.banner_4?.status) {
        this.banners = [...this.banners, this.data?.content?.offer_banner_1?.banner_4]
      }

      // Get Products
      let getProduct$;
      if (this.data?.content?.products_ids.length && this.data?.content?.product_list?.status) {
        getProduct$ = this.store.dispatch(new GetProductByIds({
          status: 1,
          approve: 1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }))
      } else {
        getProduct$ = of(null);
      }

      // Get Category
      let getCategory$;
      if (this.data?.content.category_product.category_ids.length && this.data?.content?.category_product?.status) {
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: this.data?.content.category_product.category_ids?.join(',')
        }));
      } else {
        getCategory$ = of(null);
      }

      // Get Brand
      let getBrands$;
      if (this.data?.content?.brand?.brand_ids.length && this.data?.content?.brand.status) {
        getBrands$ = this.store.dispatch(new GetBrands({
          status: 1,
          ids: this.data?.content?.brand?.brand_ids?.join(',')
        }));
      } else {
        getBrands$ = of(null);
      }

      if (this.platformId) {
        forkJoin([getProduct$, getCategory$, getBrands$]).subscribe({
          complete: () => {
            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        });
      }
    }
  }
}
