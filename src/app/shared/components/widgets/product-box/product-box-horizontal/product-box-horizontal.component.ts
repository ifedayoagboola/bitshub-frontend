import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product, Variation } from '../../../../interface/product.interface';
import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { RouterModule } from '@angular/router';
import { ProductBoxVariantAttributesComponent } from '../widgets/product-box-variant-attributes/product-box-variant-attributes.component';
import { ProductBoxImageVariantComponent } from '../widgets/image-variant/image-variant.component';
import { CartButtonComponent } from '../widgets/cart-button/cart-button.component';

@Component({
    selector: 'app-product-box-horizontal',
    imports: [CommonModule, NgbModule, CurrencySymbolPipe,
        RouterModule, ProductBoxVariantAttributesComponent, ProductBoxImageVariantComponent,
        CartButtonComponent],
    templateUrl: './product-box-horizontal.component.html',
    styleUrl: './product-box-horizontal.component.scss'
})
export class ProductBoxHorizontalComponent {

  @Input() product: Product;
  @Input() product_box_style: string;

  public selectedVariation: Variation;

  constructor(
    config: NgbRatingConfig) {
		config.max = 5;
		config.readonly = true;
	}

  selectedVariant(variation: Variation) {
    if(variation){
      this.selectedVariation = variation;
    }
  }
}
