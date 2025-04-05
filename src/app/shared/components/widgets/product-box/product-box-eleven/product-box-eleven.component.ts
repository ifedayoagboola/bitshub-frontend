import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Cart } from '../../../../interface/cart.interface';
import { Product, Variation } from '../../../../interface/product.interface';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { CartState } from '../../../../store/state/cart.state';
import { result } from '../product-box-two/product-box-two.component';
import { CartButtonComponent } from '../widgets/cart-button/cart-button.component';
import { DropdownVariantComponent } from '../widgets/dropdown-variant/dropdown-variant.component';
import { ProductBoxImageVariantComponent } from '../widgets/image-variant/image-variant.component';
import { ProductHoverActionComponent } from '../widgets/product-hover-action/product-hover-action.component';

@Component({
    selector: 'app-product-box-eleven',
    imports: [CommonModule, RouterModule, NgbModule, TranslateModule,
        CurrencySymbolPipe, ProductHoverActionComponent,
        CartButtonComponent, ProductBoxImageVariantComponent,
        DropdownVariantComponent],
    templateUrl: './product-box-eleven.component.html',
    styleUrl: './product-box-eleven.component.scss'
})
export class ProductBoxElevenComponent {

  @Input() product: Product;

  cartItem$: Observable<Cart[]> = inject(Store).select(CartState.cartItems);

  public selectedVariation: Variation | null;
  public soldOutAttributesIds: number[] = [];
  public cartItem: Cart | null;
  public result:result[] = [];

  constructor(
    config: NgbRatingConfig) {
		config.max = 5;
		config.readonly = true;
	}

  ngOnInit(){
    this.cartItem$.subscribe(items => {
      this.cartItem = items.find((item) => {
        if(item.variation_id){
          this.product.variations.find((i) => {
            return i.id ==  item.variation_id;
          })
        }else{
          return item.product.id == this.product.id;
        }
      })!
    });
  }

  // Select First Attribute
  checkVariant(item: Variation, i: number){
    if(item.stock_status == 'in_stock' && item.status){
      if(item.stock_status === 'in_stock' && item.status && i === this.result.findIndex(obj => obj.value.stock_status === 'in_stock' && obj.value.status)){
        return true;
      }
    }
  }

  // Change Variation
  getSelectedVariant(option: Variation){
    if(option){
      this.selectedVariation = option;
    }
  }

}
