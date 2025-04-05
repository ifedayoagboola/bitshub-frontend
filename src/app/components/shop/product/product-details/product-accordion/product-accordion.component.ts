import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { Product, Variation } from '../../../../../shared/interface/product.interface';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import * as data from '../../../../../shared/data/owl-carousel';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CarouselComponent, CarouselModule, SlidesOutputData } from 'ngx-owl-carousel-o';
import { ProductContentComponent } from '../widgets/product-content/product-content.component';
import { ProductInformationComponent } from '../widgets/product-information/product-information.component';
import { ProductDeliveryInformationComponent } from '../widgets/product-delivery-information/product-delivery-information.component';
import { PaymentOptionComponent } from '../widgets/payment-option/payment-option.component';
import { ProductDetailsComponent } from '../widgets/product-details/product-details.component';
import { ProductDetailsAccordionComponent } from '../widgets/product-details-accordion/product-details-accordion.component';
import { ProductDetailsTabComponent } from '../widgets/product-details-tab/product-details-tab.component';
import { ThemeOptionService } from '../../../../../shared/services/theme-option.service';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { TranslateModule } from '@ngx-translate/core';
import { ProductDigitalOptionsComponent } from '../widgets/product-digital-options/product-digital-options.component';

@Component({
    selector: 'app-product-accordion',
    imports: [CommonModule, CarouselModule, NgxImageZoomModule, TranslateModule, ProductContentComponent,
        PaymentOptionComponent, ProductDetailsComponent, ProductDetailsAccordionComponent,
        ProductDetailsTabComponent, ProductDigitalOptionsComponent],
    templateUrl: './product-accordion.component.html',
    styleUrl: './product-accordion.component.scss'
})
export class ProductAccordionComponent {

  @Input() product: Product;
  @Input() option: Option | null;

  @ViewChild('thumbnailCarousel') thumbnailCarousel: CarouselComponent;

  public selectedVariation: Variation;
  public activeSlide: string = '0';
  public videType = ['video/mp4', 'video/webm', 'video/ogg'];
  public audioType = ['audio/mpeg', 'audio/wav', 'audio/ogg'];

  public productMainThumbSlider = data.productMainThumbSlider;
  public productThumbSlider = data.productThumbSlider;
  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: object){
    this.isBrowser = isPlatformBrowser(platformId);
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
