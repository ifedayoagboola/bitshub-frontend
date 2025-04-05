import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../../../../../../shared/store/state/product.state';
import { Observable } from 'rxjs';
import { Product, Variation } from '../../../../../../shared/interface/product.interface';
import { Cart, CartAddOrUpdate } from '../../../../../../shared/interface/cart.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { CurrencySymbolPipe } from '../../../../../../shared/pipe/currency.pipe';
import { ButtonComponent } from '../../../../../../shared/components/widgets/button/button.component';
import { CartState } from '../../../../../../shared/store/state/cart.state';
import { AddToCart } from '../../../../../../shared/store/action/cart.action';
import { DropdownVariantComponent } from '../../../../../../shared/components/widgets/product-box/widgets/dropdown-variant/dropdown-variant.component';

@Component({
    selector: 'app-product-bundle',
    imports: [CommonModule, TranslateModule, RouterModule, CurrencySymbolPipe, ButtonComponent, DropdownVariantComponent],
    templateUrl: './product-bundle.component.html',
    styleUrl: './product-bundle.component.scss'
})
export class ProductBundleComponent {

  crossSellProduct$: Observable<Product[]> = inject(Store).select(ProductState.relatedProducts);
  cartItem$: Observable<Cart[]> = inject(Store).select(CartState.cartItems);

  @Input() product: Product | null;

  public cartItem: Cart | null;

  public crossSellProducts: Product[] = [];
  public crossSellProductsIds: number[] = [];
  public selectedProduct: any[] = [];
  public selectedProductIds: number[] = [];
  public selectedVariation: Variation;

  public total: number = 0;

  constructor(private store: Store) {}

  ngOnChanges() {
    if (this.product?.cross_sell_products && Array.isArray(this.product?.cross_sell_products)) {
      this.crossSellProduct$.subscribe(products => {
        this.crossSellProducts = products.filter(product => this.product?.cross_sell_products?.includes(product?.id!));
        this.crossSellProductsIds = this.crossSellProducts.map(product => {
          return product && product?.id
        } )
      });
    }
  }

  select(event: Event, productId: number) {
    const isChecked = (<HTMLInputElement>event.target).checked;
    if (isChecked) {
      this.selectedProductIds.push(productId);
    } else {
      const index = this.selectedProductIds.indexOf(productId);
      if (index !== -1) {
        this.selectedProductIds.splice(index, 1);
      }
    }

    this.crossSellProduct$.subscribe(products => {
      const dataProducts = [...products, this.selectedVariation]
      this.selectedProduct = dataProducts.filter(product => this.selectedProductIds?.includes(product?.id!));
    });

    this.total = this.selectedProduct.reduce((sum, item) => sum + (item.selected_variant ? item.selected_variant.sale_price : item.sale_price), 0);
  }

  isChecked(productId: any): boolean {
    return this.selectedProductIds.includes(productId);
  }

  addToCartAll() {
    this.selectedProduct.forEach(product => {
      if(product) {
        this.cartItem$.subscribe(items => {
          this.cartItem = items.find(item => item.product.id == product.id)!;
        });
        const params: CartAddOrUpdate = {
          id: this.cartItem && (product.selected_variant && this.cartItem?.variation &&
            product.selected_variant?.id == this.cartItem?.variation?.id) ? this.cartItem.id : null,
          product_id: product?.id,
          product: product ? product : null,
          variation: product.selected_variant? product.selected_variant : null,
          variation_id: product.selected_variant ? product?.selected_variant?.id : null,
          quantity: 1
        }
        this.store.dispatch(new AddToCart(params));
      }
    });
  }

  getSelectedVariant(option: Variation, products: Product){
    if (option) {
      const index = this.crossSellProducts.findIndex(product => product.id === products.id);
      products['selected_variant'] = option;
      this.crossSellProducts[index] = products;
      this.selectedVariation = option;
      this.total = this.selectedProduct.reduce((sum, item) => sum + (item.selected_variant ? item.selected_variant.sale_price : item.sale_price), 0);
    }
  }
}
