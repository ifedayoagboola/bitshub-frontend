import { Component, Input } from '@angular/core';
import { Cart, CartAddOrUpdate } from '../../../../interface/cart.interface';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';
import { VariantAttributesComponent } from '../../variant-attributes/variant-attributes.component';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { Product, Variation } from '../../../../interface/product.interface';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { ReplaceCart } from '../../../../store/action/cart.action';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-variation-modal',
    imports: [CommonModule, TranslateModule, CurrencySymbolPipe, RouterModule,
        ButtonComponent, VariantAttributesComponent],
    templateUrl: './variation-modal.component.html',
    styleUrl: './variation-modal.component.scss'
})
export class VariationModalComponent {

  @Input() variation: Cart;

  public product: Product;
  public productQty: number = 1;
  public selectedVariation: Variation | null;

  constructor(public modal: NgbActiveModal,
    private store: Store){}

  ngOnInit(){
    this.product = this.variation.product;
    this.productQty = this.variation.quantity;
  }
 
  selectVariation(variation: Variation) {
    this.selectedVariation = variation;
  }

  updateQuantity(qty: number) {
    if(1 > this.productQty + (qty)) return;
    this.productQty = this.productQty + (qty);
  }

  replaceCart(product: Product) {
    if(product && this.variation) {
      const params: CartAddOrUpdate = {
        id: this.variation.id,
        product_id: product?.id,
        product: product ? product : null,
        variation: this.selectedVariation ? this.selectedVariation : null,
        variation_id: this.selectedVariation ? this.selectedVariation.id : null,
        quantity: this.productQty
      }

      this.store.dispatch(new ReplaceCart(params)).subscribe({
        complete: () => {
          this.modal.close();
        }
      });
    }
  }
}
