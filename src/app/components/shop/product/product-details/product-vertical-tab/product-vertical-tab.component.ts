import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { CarouselComponent, CarouselModule, SlidesOutputData } from 'ngx-owl-carousel-o';
import * as data from '../../../../../shared/data/owl-carousel';
import { Product, Variation } from '../../../../../shared/interface/product.interface';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { ProductService } from '../../../../../shared/services/product.service';
import { PaymentOptionComponent } from '../widgets/payment-option/payment-option.component';
import { ProductBundleComponent } from '../widgets/product-bundle/product-bundle.component';
import { ProductContentComponent } from '../widgets/product-content/product-content.component';
import { ProductDeliveryInformationComponent } from '../widgets/product-delivery-information/product-delivery-information.component';
import { ProductDetailsComponent } from '../widgets/product-details/product-details.component';
import { ProductInformationComponent } from '../widgets/product-information/product-information.component';
import { ProductSocialShareComponent } from '../widgets/product-social-share/product-social-share.component';
import { VerticalDetailsTabComponent } from '../widgets/vertical-details-tab/vertical-details-tab.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProductDigitalOptionsComponent } from '../widgets/product-digital-options/product-digital-options.component';


@Component({
    selector: 'app-product-vertical-tab',
    imports: [CommonModule, NgxImageZoomModule, CarouselModule, TranslateModule,
        ProductContentComponent, ProductInformationComponent, ProductDeliveryInformationComponent, PaymentOptionComponent, ProductBundleComponent,
        VerticalDetailsTabComponent, ProductDetailsComponent, ProductDigitalOptionsComponent],
    templateUrl: './product-vertical-tab.component.html',
    styleUrl: './product-vertical-tab.component.scss'
})
export class ProductVerticalTabComponent {

  @Input() product: Product;
  @Input() option: Option | null;
  @Input() layout: string;

  @ViewChild('thumbnailCarousel') thumbnailCarousel: CarouselComponent;

  public selectedVariation: Variation;
  public activeSlide: string = '0';
  public videType = ['video/mp4', 'video/webm', 'video/ogg'];
  public audioType = ['audio/mpeg', 'audio/wav', 'audio/ogg'];

  public productMainThumbSlider = data.productMainThumbSlider;
  public productThumbSlider = data.productThumbSlider;
  public isBrowser: boolean;

  constructor(
      public productService: ProductService,
      private router: Router,
      public route: ActivatedRoute,
      @Inject(PLATFORM_ID) platformId: object){
      this.isBrowser = isPlatformBrowser(platformId);

    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.activeSlide = '0'
      }
    });
  }

  openFilter(){
    this.productService.productFilter = true;
  }

  selectedVariant(variant: Variation){
    this.selectedVariation = variant;
  }

  onCarouselLoad(){
    this.activeSlide = '0';
  }

  onSlideChange(event: SlidesOutputData) {
    if (!this.isBrowser) {
      return;
    }

    if (!event || !event.slides || event.slides.length === 0 || !event.slides[0]?.id) {
      return;
    }

    const slideId = event.slides[0].id;
    if (this.selectedVariation && this.selectedVariation.variation_galleries.length) {
      const matchingImage = this.selectedVariation.variation_galleries.find((images) => images.id.toString() === slideId);

      if (matchingImage) {
        this.activeSlide = matchingImage.id.toString();
        this.thumbnailCarousel.to(this.activeSlide);
      }
    } else {
      this.activeSlide = slideId;
      this.thumbnailCarousel.to(this.activeSlide);
    }
  }
}
