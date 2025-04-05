import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../interface/product.interface';
import { AddToWishlist, DeleteWishlist } from '../../../../../../store/action/wishlist.action';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-wishlist',
    imports: [],
    templateUrl: './wishlist.component.html',
    styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {

  @Input() product: Product;
  @Input() class: string = '';

  constructor(private store: Store){}

  addToWishlist(product: Product){
    if(this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {
      product['is_wishlist'] = !product['is_wishlist'];
    }
    let action = product['is_wishlist'] === !!this.store.selectSnapshot(state => state.auth && state.auth.access_token) ? new AddToWishlist({ product_id: product.id }) : new DeleteWishlist(product.id);
    if(action){
      this.store.dispatch(action);
    }
  }
}
