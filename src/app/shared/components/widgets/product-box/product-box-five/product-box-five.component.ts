import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Product, Variation } from '../../../../interface/product.interface';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { DisplayVariantAttributesComponent } from '../../display-variant-attributes/display-variant-attributes.component';
import { CartButtonComponent } from '../widgets/cart-button/cart-button.component';
import { ProductBoxImageVariantComponent } from '../widgets/image-variant/image-variant.component';
import { ProductHoverActionComponent } from '../widgets/product-hover-action/product-hover-action.component';
import { WishlistComponent } from '../widgets/product-hover-action/wishlist/wishlist.component';

@Component({
    selector: 'app-product-box-five',
    imports: [CommonModule, CurrencySymbolPipe, RouterModule, TranslateModule,
        ProductHoverActionComponent, DisplayVariantAttributesComponent, WishlistComponent,
        CartButtonComponent, ProductBoxImageVariantComponent, NgbRating],
    templateUrl: './product-box-five.component.html',
    styleUrl: './product-box-five.component.scss'
})
export class ProductBoxFiveComponent {

  @Input() product: Product;

  public selectedVariation: Variation;

  selectedVariant(variation: Variation) {
    if(variation){
      this.selectedVariation = variation;
      // this.selectedVariant.emit(this.selectedVariation);
    }
  }
}
