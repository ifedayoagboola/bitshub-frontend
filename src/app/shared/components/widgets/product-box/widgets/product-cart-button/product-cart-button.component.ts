import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Cart, CartAddOrUpdate } from '../../../../../interface/cart.interface';
import { Product } from '../../../../../interface/product.interface';
import { AddToCart } from '../../../../../store/action/cart.action';
import { CartState } from '../../../../../store/state/cart.state';
// import { ProductDetailsModalComponent } from '../../../modal/product-details-modal/product-details-modal.component';

@Component({
    selector: 'app-product-cart-button',
    imports: [CommonModule, TranslateModule],
    templateUrl: './product-cart-button.component.html',
    styleUrl: './product-cart-button.component.scss'
})
export class ProductCartButtonComponent {

  @Input() product: Product;
  @Input() type: string;

  cartItem$: Observable<Cart[]> = inject(Store).select(CartState.cartItems);

  public cartItem: Cart | null;

  constructor(private store: Store, private modal: NgbModal){}

  ngOnInit() {
    this.cartItem$.subscribe(items => {
      this.cartItem = items.find(item => item.product.id == this.product.id)!;
    });
  }

  openModal(product: Product){
    // const modal = this.modal.open(ProductDetailsModalComponent, { centered: true, size: 'lg', windowClass: 'theme-modal-2'});
    // modal.componentInstance.product = product;
  }

  addToCart(product: Product, qty: number) {
    const params: CartAddOrUpdate = {
      id: this.cartItem ? this.cartItem.id : null,
      product: product,
      product_id: product?.id,
      variation_id: this.cartItem ? this.cartItem?.variation_id : null,
      variation: this.cartItem ? this.cartItem?.variation : null,
      quantity: qty
    }
    this.store.dispatch(new AddToCart(params));
  }
}
