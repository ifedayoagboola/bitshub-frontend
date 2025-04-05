import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Product, Variation } from '../../../../interface/product.interface';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { CartButtonComponent } from '../widgets/cart-button/cart-button.component';
import { ProductBoxImageVariantComponent } from '../widgets/image-variant/image-variant.component';
import { ProductHoverActionComponent } from '../widgets/product-hover-action/product-hover-action.component';
import { WishlistComponent } from '../widgets/product-hover-action/wishlist/wishlist.component';

@Component({
    selector: 'app-product-box-four',
    imports: [CommonModule, CarouselModule, NgbModule, TranslateModule,
        CurrencySymbolPipe, RouterModule, ProductHoverActionComponent,
        WishlistComponent, CartButtonComponent, ProductBoxImageVariantComponent],
    templateUrl: './product-box-four.component.html',
    styleUrl: './product-box-four.component.scss'
})
export class ProductBoxFourComponent {

  @Input() product: Product;

  public selectedVariation: Variation;
  public activeSlide: string = '0';
  public options: OwlOptions = {
    loop: true,
    nav: true,
    dots: false,
    navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>",],
    responsive: {
      0: {
        items: 1
      }
    }

  }

  // Product Main Thumb Slider
public productMainThumbSlider: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: true,
  dots: false,
  items: 1,
  nav: true,
  navText: ["<i class='fa fa-chevron-left'></i>","<i class='fa fa-chevron-right'></i>",],
  autoplay: false,
  autoHeight:true,
  autoplayTimeout:5000,
  autoplayHoverPause:true,
  navSpeed: 300,
  responsive: {
    0: {
      items: 1,
    },
  },
};

  constructor(
    config: NgbRatingConfig) {
		config.max = 5;
		config.readonly = true;
	}

  selectVariation(variation: Variation) {
    if(variation){
      this.selectedVariation = variation;
      // this.selectedVariant.emit(this.selectedVariation);
    }
  }
}
