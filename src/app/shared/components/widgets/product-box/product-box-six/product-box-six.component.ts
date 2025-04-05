import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Product, Variation } from '../../../../interface/product.interface';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { SaleTimerComponent } from '../../sale-timer/sale-timer.component';
import { CartButtonComponent } from '../widgets/cart-button/cart-button.component';
import { ProductBoxImageVariantComponent } from '../widgets/image-variant/image-variant.component';
import { ProductHoverActionComponent } from '../widgets/product-hover-action/product-hover-action.component';

@Component({
    selector: 'app-product-box-six',
    imports: [CommonModule, RouterModule, CurrencySymbolPipe,
        NgbModule, ProductHoverActionComponent,
        CartButtonComponent, SaleTimerComponent, ProductBoxImageVariantComponent, TranslateModule],
    templateUrl: './product-box-six.component.html',
    styleUrl: './product-box-six.component.scss'
})
export class ProductBoxSixComponent {

  @Input() product: Product;

  public selectedVariation: Variation;

  selectedVariant(variation: Variation) {
    if(variation){
      this.selectedVariation = variation;
      // this.selectedVariant.emit(this.selectedVariation);
    }
  }
}
