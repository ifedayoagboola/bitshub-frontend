import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Product, Variation } from '../../../../interface/product.interface';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { ProductCartButtonComponent } from '../widgets/product-cart-button/product-cart-button.component';
import { ProductHoverActionComponent } from '../widgets/product-hover-action/product-hover-action.component';
import { VariantAttributesComponent } from '../../variant-attributes/variant-attributes.component';
// import { ProductContentComponent } from '../../../../../components/shop/product/product-details/widgets/product-content/product-content.component';
import { DisplayVariantAttributesComponent } from '../../display-variant-attributes/display-variant-attributes.component';
import { ProductBoxVariantAttributesComponent } from '../widgets/product-box-variant-attributes/product-box-variant-attributes.component';
import { CartButtonComponent } from '../widgets/cart-button/cart-button.component';
import { ProductBoxImageVariantComponent } from '../widgets/image-variant/image-variant.component';

@Component({
    selector: 'app-product-box-one',
    // ProductContentComponent
    imports: [CommonModule, NgbModule, RouterModule, TranslateModule,
        CurrencySymbolPipe, ProductHoverActionComponent,
        ProductBoxVariantAttributesComponent, CartButtonComponent, ProductHoverActionComponent,
        ProductBoxImageVariantComponent],
    templateUrl: './product-box-one.component.html',
    styleUrl: './product-box-one.component.scss'
})
export class ProductBoxOneComponent {

  @Input() product: Product;

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
