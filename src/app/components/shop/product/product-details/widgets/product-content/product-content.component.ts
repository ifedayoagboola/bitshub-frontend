import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, inject, Input, Output, PLATFORM_ID, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { CarouselComponent } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { ButtonComponent } from '../../../../../../shared/components/widgets/button/button.component';
import { SaleTimerComponent } from '../../../../../../shared/components/widgets/sale-timer/sale-timer.component';
import { VariantAttributesComponent } from '../../../../../../shared/components/widgets/variant-attributes/variant-attributes.component';
import { ProductSocialShareComponent } from '../product-social-share/product-social-share.component';
import { ProductWholesalesComponent } from '../product-wholesales/product-wholesales.component';
import { Cart, CartAddOrUpdate } from '../../../../../../shared/interface/cart.interface';
import { Product, Variation } from '../../../../../../shared/interface/product.interface';
import { Values } from '../../../../../../shared/interface/setting.interface';
import { Option } from '../../../../../../shared/interface/theme-option.interface';
import { CurrencySymbolPipe } from '../../../../../../shared/pipe/currency.pipe';
import { AddToCart } from '../../../../../../shared/store/action/cart.action';
import { AddToCompare } from '../../../../../../shared/store/action/compare.action';
import { AddToWishlist, DeleteWishlist } from '../../../../../../shared/store/action/wishlist.action';
import { CartState } from '../../../../../../shared/store/state/cart.state';
import { SettingState } from '../../../../../../shared/store/state/setting.state';
import { WishlistState } from '../../../../../../shared/store/state/wishlist.state';
import { ProductDetailsComponent } from '../product-details/product-details.component';

@Component({
    selector: 'app-product-content',
    imports: [CommonModule, NgbModule, CurrencySymbolPipe,
        VariantAttributesComponent, TranslateModule, SaleTimerComponent,
        ProductWholesalesComponent, ButtonComponent],
    templateUrl: './product-content.component.html',
    styleUrl: './product-content.component.scss'
})
export class ProductContentComponent {

  cartItem$: Observable<Cart[]> = inject(Store).select(CartState.cartItems);
  setting$: Observable<Values> = inject(Store).select(SettingState.setting) as Observable<Values>;
  wishlistIds$: Observable<number[]> = inject(Store).select(WishlistState.wishlistIds);

  @Input() product: Product;
  @Input() option: Option | null;
  @Input() owlCar: CarouselComponent;
  @Input() product_variation: boolean = false;
  @Input() variant_hover: boolean = true;

  @Output() selectedVariant = new EventEmitter<Variation>();

  public selectedVariation: Variation | null;
  public productQty: number = 1;
  public shippingFreeAmt: number = 0;
  public totalPrice: number = 0;
  public cartItem: Cart | null;
  public isBrowser: boolean;

  constructor(private store: Store, private router: Router, private modal: NgbModal, @Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.setting$.subscribe(setting => this.shippingFreeAmt = setting?.general?.min_order_free_shipping);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['product'] && changes['product'].currentValue) {
      this.selectedVariation = null;
      this.product = changes['product']?.currentValue;
    }

    this.productQty = 1;

    this.cartItem$.subscribe(items => {
      this.cartItem = items.find((item) => {
        if(item.variation && item.variation != null  && item.variation_id && item.variation_id != null){
          this.product.variations.find((i) => {
            if(i.id ==  item.variation_id)
              return i.id ==  item.variation_id;

          })
          return true
        }
        else{
          return item.product.id == this.product.id;
        }
      })!
    });
  }

  ngOnInit(){
    this.wholesalePriceCal();
  }

  selectVariation(variation: Variation) {
    if(variation){
      this.selectedVariation = variation;
      this.selectedVariant.emit(this.selectedVariation);
    }
  }

  updateQuantity(qty: number) {
    if(1 > this.productQty + (qty)) return;
    this.productQty = this.productQty + (qty);

    this.wholesalePriceCal();
  }

  externalProductLink(link: string) {
    if(this.isBrowser) {
      if(link) {
        window.open(link, "_blank");
      }
    }
  }

  addToCart(product: Product, buyNow?: boolean) {
    if(product) {
      const params: CartAddOrUpdate = {
        id: this.cartItem && (this.selectedVariation && this.cartItem?.variation &&
          this.selectedVariation?.id == this.cartItem?.variation?.id) ? this.cartItem.id : null,
        product_id: product?.id,
        product: product ? product : null,
        variation: this.selectedVariation ? this.selectedVariation : null,
        variation_id: this.selectedVariation?.id ? this.selectedVariation?.id : null,
        quantity: this.productQty
      }

      this.store.dispatch(new AddToCart(params)).subscribe({
        complete: () => {
          this.modal.dismissAll();
          if(buyNow) {

            this.router.navigate(['/checkout']);
          }
        }
      });
    }
  }

  addToWishlist(product: Product){
    if(this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {
      product['is_wishlist'] = !product['is_wishlist'];
    }
    let action = product['is_wishlist'] && product['is_wishlist'] && !!this.store.selectSnapshot(state => state.auth && state.auth.access_token) ? new AddToWishlist({ product_id: product.id }) : new DeleteWishlist(product.id);
    if(action){
      this.store.dispatch(action);
    }
  }

  addToCompare(product: Product){
    this.store.dispatch(new AddToCompare({ product: product }));
  }

  wholesalePriceCal() {
    let wholesale = this.product.wholesales.find(value => value.min_qty <= this.productQty && value.max_qty >= this.productQty) || null;
    if(wholesale && this.product.wholesale_price_type == 'fixed') {
      this.totalPrice = this.productQty * wholesale.value;
    } else if(wholesale && this.product.wholesale_price_type == 'percentage') {
      this.totalPrice = this.productQty * (this.selectedVariation ? this.selectedVariation.sale_price : this.product.sale_price);
      this.totalPrice = this.totalPrice - (this.totalPrice * (wholesale.value / 100));
    } else {
      this.totalPrice = this.productQty * (this.selectedVariation ? this.selectedVariation.sale_price : this.product.sale_price);
    }
  }

  openModal(product: Product){
      const modal = this.modal.open(ProductSocialShareComponent, { centered: true, windowClass: 'theme-modal-2' });
    modal.componentInstance.product = product;
  }
}
