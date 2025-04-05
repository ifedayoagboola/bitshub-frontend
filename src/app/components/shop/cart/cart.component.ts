import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { Select, Store } from '@ngxs/store';
import { CartState } from '../../../shared/store/state/cart.state';
import { Observable } from 'rxjs';
import { Cart, CartAddOrUpdate } from '../../../shared/interface/cart.interface';
import { DeleteCart, UpdateCart } from '../../../shared/store/action/cart.action';
import { RouterModule } from '@angular/router';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency.pipe';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';

@Component({
    selector: 'app-cart',
    imports: [CommonModule, RouterModule, CurrencySymbolPipe,
        TranslateModule, BreadcrumbComponent, ButtonComponent,
        NoDataComponent],
    templateUrl: './cart.component.html',
    styleUrl: './cart.component.scss'
})
export class CartComponent {

  cartItem$: Observable<Cart[]> = inject(Store).select(CartState.cartItems);
  cartTotal$: Observable<number> = inject(Store).select(CartState.cartTotal);
  cartDigital$: Observable<boolean | number> = inject(Store).select(CartState.cartHasDigital) as Observable<boolean | number>;

  public breadcrumb: breadcrumb = {
    title: "Cart",
    items: [{ label: 'Cart', active: true }]
  }

  constructor(private store: Store) {}

  updateQuantity(item: Cart, qty: number) {
    const params: CartAddOrUpdate = {
      id: item?.id,
      product: item?.product,
      product_id: item?.product?.id,
      variation: item?.variation,
      variation_id: item?.variation_id ? item?.variation_id : null,
      quantity: qty
    }
    this.store.dispatch(new UpdateCart(params));
  }

  delete(id: number) {
    this.store.dispatch(new DeleteCart(id));
  }
}
