import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, inject, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { Product, Variation } from '../../../shared/interface/product.interface';
import { Option } from '../../../shared/interface/theme-option.interface';
import { ProductState } from '../../../shared/store/state/product.state';
import { ThemeOptionState } from '../../../shared/store/state/theme-option.state';
import { ProductAccordionComponent } from './product-details/product-accordion/product-accordion.component';
import { ProductImagesComponent } from './product-details/product-images/product-images.component';
import { ProductNoSidebarComponent } from './product-details/product-no-sidebar/product-no-sidebar.component';
import { ProductSidebarLeftComponent } from './product-details/product-sidebar-left/product-sidebar-left.component';
import { ProductSidebarRightComponent } from './product-details/product-sidebar-right/product-sidebar-right.component';
import { ProductSliderComponent } from './product-details/product-slider/product-slider.component';
import { ProductStickyComponent } from './product-details/product-sticky/product-sticky.component';
import { ProductThreeColumnThumbnailBottomComponent } from './product-details/product-three-column-thumbnail-bottom/product-three-column-thumbnail-bottom.component';
import { ProductThumbnailOutsideImagesComponent } from './product-details/product-thumbnail-outside-images/product-thumbnail-outside-images.component';
import { ProductThumbnailComponent } from './product-details/product-thumbnail/product-thumbnail.component';
import { ProductVerticalTabComponent } from './product-details/product-vertical-tab/product-vertical-tab.component';
import { RelatedProductComponent } from './product-details/widgets/related-product/related-product.component';
import { StickyCheckoutComponent } from './product-details/widgets/sticky-checkout/sticky-checkout.component';
import { SeoService } from '../../../shared/services/seo.service';

@Component({
    selector: 'app-product',
    imports: [CommonModule, BreadcrumbComponent, ProductThumbnailComponent,
        RelatedProductComponent, StickyCheckoutComponent, ProductImagesComponent,
        ProductSliderComponent, ProductStickyComponent, ProductAccordionComponent,
        ProductNoSidebarComponent, ProductThumbnailOutsideImagesComponent, ProductVerticalTabComponent,
        ProductThreeColumnThumbnailBottomComponent, ProductSidebarLeftComponent, ProductSidebarRightComponent],
    templateUrl: './product.component.html',
    styleUrl: './product.component.scss'
})
export class ProductComponent {

  product$: Observable<Product> = inject(Store).select(ProductState.selectedProduct) as Observable<Product>;
  themeOptions$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public breadcrumb: breadcrumb = {
    title: "Product",
    items: []
  }

  public layout: string = 'product_digital';
  public product: Product;
  public isScrollActive = false;
  public selectedVariants: Variation;
  public isBrowser: boolean;

  constructor(private route: ActivatedRoute,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,) {
    this.isBrowser = isPlatformBrowser(platformId);

    this.product$.subscribe(product => {
      if(product)
        this.breadcrumb.items = [];
        this.breadcrumb.title = product.name;
        this.breadcrumb.items.push({ label: 'Product', active: true }, { label: product.name, active: false });
        this.product = product;

    });

    // For Demo Purpose only
    this.route.queryParams.subscribe(params => {
      if(params['layout']) {
        this.layout = params['layout'];
      } else {
        // Get Product Layout
        this.themeOptions$.subscribe(option => {
          this.layout = option?.product && option?.product?.product_layout ? option?.product?.product_layout : 'product_thumbnail';
        });
      }
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
     if(this.isBrowser) {
       const button = document.querySelector('.scroll-button');
       if (button) {
         const buttonRect = button.getBoundingClientRect();
         if (buttonRect.bottom < window.innerHeight && buttonRect.bottom < 0) {
           this.isScrollActive = true;
           document.body.classList.add('stickyCart');
         } else {
           this.isScrollActive = false;
           document.body.classList.remove('stickyCart');
         }

         if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
           this.isScrollActive = false;
           document.body.classList.remove('stickyCart');
         }
       }
     }
  }

  selectedVariant(variant: Variation){
    if(variant){
      this.selectedVariants = variant;
    }
  }

  ngOnDestroy(){
    if(isPlatformBrowser(this.platformId)) {
      document.body.classList.remove('stickyCart')
    }
  }
}
