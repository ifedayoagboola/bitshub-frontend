import { Component, Inject, inject, Input, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import { Product, Variation } from '../../../../../interface/product.interface';
import { Cart, CartAddOrUpdate } from '../../../../../interface/cart.interface';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartState } from '../../../../../store/state/cart.state';
import { ProductDetailsModalComponent } from '../../../modal/product-details-modal/product-details-modal.component';
import { AddToCart, UpdateCart } from '../../../../../store/action/cart.action';
import { ButtonComponent } from '../../../button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-cart-button',
    imports: [ButtonComponent, TranslateModule, CommonModule],
    templateUrl: './cart-button.component.html',
    styleUrl: './cart-button.component.scss'
})
export class CartButtonComponent {

  @Input() product: Product;
  @Input() text: string;
  @Input() class: string;
  @Input() iconClass: string = '';
  @Input() selectedVariation: Variation | null
  @Input() enableModal: boolean = false;
  @Input() quantity: boolean = false;

  cartItem$: Observable<Cart[]> = inject(Store).select(CartState.cartItems);

  @ViewChild("productDetailModal") productDetailModal: ProductDetailsModalComponent;

  public cartItem: Cart | null;
  public currentDate: number | null;
  public saleStartDate: number | null;
  public isBrowser: boolean;

  constructor(private store: Store, private modal: NgbModal, @Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
	}

  ngOnInit() {
    this.cartItem$.subscribe(items => {
      this.cartItem = items.find(item => item.product.id == this.product.id)!;
    });
  }

  addToCart(product: Product, qty: number) {
    if(product) {
      const params: CartAddOrUpdate = {
        id: this.cartItem && (this.selectedVariation && this.cartItem?.variation &&
          this.selectedVariation?.id == this.cartItem?.variation?.id) ? this.cartItem.id : null,
        product_id: product?.id!,
        product: product ? product : null,
        variation: this.selectedVariation ? this.selectedVariation : null,
        variation_id: this.selectedVariation?.id ? this.selectedVariation?.id! : null,
        quantity: qty
      }

      this.store.dispatch(new AddToCart(params));
    }
  }

  updateQuantity(product: Product, qty: number) {
    const params: CartAddOrUpdate = {
      id: this.cartItem ? this.cartItem.id : null,
      product: product,
      product_id: product?.id,
      variation_id: this.cartItem ? this.cartItem?.variation_id : null,
      variation: this.cartItem ? this.cartItem?.variation : null,
      quantity: qty
    }
    this.store.dispatch(new UpdateCart(params));
  }

  externalProductLink(link: string) {
    if(this.isBrowser) {
      if(link) {
        window.open(link, "_blank");
      }
    }
  }

  openModal(product: Product){
    const modal = this.modal.open(ProductDetailsModalComponent, { centered: true, size: 'lg' , windowClass: 'theme-modal-2 cart-view-modal'});
    modal.componentInstance.product = product;
  }
}
