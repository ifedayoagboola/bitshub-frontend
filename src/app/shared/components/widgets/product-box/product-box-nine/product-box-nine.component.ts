import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Product, Variation } from '../../../../interface/product.interface';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { DisplayVariantAttributesComponent } from '../../display-variant-attributes/display-variant-attributes.component';
import { CartButtonComponent } from '../widgets/cart-button/cart-button.component';
import { ProductBoxImageVariantComponent } from '../widgets/image-variant/image-variant.component';
import { ProductHoverActionComponent } from '../widgets/product-hover-action/product-hover-action.component';
import { WishlistComponent } from '../widgets/product-hover-action/wishlist/wishlist.component';

@Component({
    selector: 'app-product-box-nine',
    imports: [CommonModule, RouterModule, CurrencySymbolPipe, TranslateModule,
        NgbModule, ProductHoverActionComponent, DisplayVariantAttributesComponent,
        CartButtonComponent, DisplayVariantAttributesComponent, ProductBoxImageVariantComponent, WishlistComponent],
    templateUrl: './product-box-nine.component.html',
    styleUrl: './product-box-nine.component.scss'
})
export class ProductBoxNineComponent {

  @Input() product: Product;

  public hoverImage: string;
  public selectedVariation: Variation;

  constructor(
    config: NgbRatingConfig) {
		config.max = 5;
		config.readonly = true;
	}

  selectedVariant(variation: Variation) {
    if(variation){
      this.selectedVariation = variation;
      // this.selectedVariant.emit(this.selectedVariation);
    }
  }
}
