import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngxs/store';
import { forkJoin, Observable, Subscription } from 'rxjs';

import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';
import { ProductBoxComponent } from '../../../../shared/components/widgets/product-box/product-box.component';
import { ThemeBrandComponent } from '../../widgets/theme-brand/theme-brand.component';
import { ThemeProductComponent } from '../../widgets/theme-product/theme-product.component';
import { ThemeTitleComponent } from '../../widgets/theme-title/theme-title.component';

import { productSlider } from '../../../../shared/data/owl-carousel';

import { CategoryModel } from '../../../../shared/interface/category.interface';
import { Params } from '../../../../shared/interface/core.interface';
import { Product, ProductModel } from '../../../../shared/interface/product.interface';
import { FashionSeven, FeaturedBanner } from '../../../../shared/interface/theme.interface';

import { ThemeOptionService } from '../../../../shared/services/theme-option.service';

import { GetMoreProduct, GetProductByIds, GetProducts } from '../../../../shared/store/action/product.action';

import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../../environments/environment';
import { ButtonComponent } from '../../../../shared/components/widgets/button/button.component';
import { GetBrands } from '../../../../shared/store/action/brand.action';
import { CategoryState } from '../../../../shared/store/state/category.state';
import { ProductState } from '../../../../shared/store/state/product.state';

@Component({
    selector: 'app-fashion-7',
    imports: [CommonModule, TranslateModule, ImageLinkComponent, ThemeTitleComponent,
        ThemeProductComponent, ProductBoxComponent,
        ThemeBrandComponent, ButtonComponent],
    templateUrl: './fashion-7.component.html',
    styleUrl: './fashion-7.component.scss'
})
export class Fashion7Component {

  product$: Observable<ProductModel> = inject(Store).select(ProductState.product);
  moreProduct$: Observable<Product[]> = inject(Store).select(ProductState.moreProduct);
  category$: Observable<CategoryModel> = inject(Store).select(CategoryState.category);

  @Input() data?: FashionSeven;
  @Input() slug?: string;

  public finished: boolean;
  public total_product: number;
  public button_loader: boolean = false;
  public options = productSlider;
  public paginateProducts: Product[] = [];
  public allProducts: Product[] = [];  // Store all fetched products

  public banners: FeaturedBanner[];

  private productSubscription: Subscription;
  private productsSubscription: Subscription;
  public StorageURL = environment.storageURL;

  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 4, // Display per page,
    'status': 1,
    'approve': 1,
    'category_id': '',
  }
  private platformId: boolean;

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) platformId: Object,
    private themeOptionService: ThemeOptionService) {
      this.platformId = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if(this.data?.slug == this.slug) {
        this.filter['category_id'] = this.data?.content.products_list_1.category_id;

        this.productsSubscription = this.moreProduct$.subscribe((productList) => {
          if (productList && productList.length) {
            this.allProducts = productList;
            this.total_product = this.allProducts.length;
            console.log(this.total_product);
            
            this.paginateProducts = this.allProducts.slice(0, 4);
            this.finished = this.paginateProducts.length >= this.total_product;
          }
        });

      this.banners = [];
      if(this.data?.content?.featured_banners?.banner_1?.status){
        this.banners = [...this.banners, this.data?.content?.featured_banners?.banner_1]
      }
      if(this.data?.content?.featured_banners?.banner_2?.status){
        this.banners = [...this.banners, this.data?.content?.featured_banners?.banner_2]
      }
      if(this.data?.content?.featured_banners?.banner_3?.status){
        this.banners = [...this.banners, this.data?.content?.featured_banners?.banner_3]
      }

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

      // Get Products
      const getMoreProducts$ = this.store.dispatch(new GetMoreProduct(this.filter));

      // Get Brand
      const getBrands$ = this.store.dispatch(new GetBrands({
        status: 1,
        ids: this.data?.content?.brand?.brand_ids?.join(',')
      }));

      if(this.platformId) {
        // Skeleton Loader
        document.body.classList.add('skeleton-body');

        forkJoin([getProducts$, getBrands$, getMoreProducts$]).subscribe({
          complete: () => {
            this.store.dispatch(new GetProducts(this.filter));

            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        });
      }
    }
  }

  loadMore() {
    if (this.paginateProducts.length < this.total_product) {
      this.button_loader = true;

      setTimeout(() => {
        const nextProducts = this.allProducts.slice(this.paginateProducts.length, this.paginateProducts.length + 4);
        this.paginateProducts = [...this.paginateProducts, ...nextProducts];
  
        this.finished = this.paginateProducts.length >= this.total_product;
        this.button_loader = false;
      }, 1000);
    }
  }
  
  ngOnDestroy() {
    if (this.productSubscription && this.productsSubscription) {
      this.productSubscription.unsubscribe();
      this.productsSubscription.unsubscribe();
    }
  }
}
