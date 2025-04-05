import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../../../store/state/product.state';
import { Observable, Subscription } from 'rxjs';
import { Product, ProductModel } from '../../../interface/product.interface';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-recent-purchase-popup',
    imports: [TranslateModule, RouterModule],
    templateUrl: './recent-purchase-popup.component.html',
    styleUrls: ['./recent-purchase-popup.component.scss']
})
export class RecentPurchasePopupComponent implements OnInit, OnDestroy {

  relatesProduct$: Observable<Product[]> = inject(Store).select(ProductState.relatedProducts);
  product$: Observable<ProductModel> = inject(Store).select(ProductState.product);

  public product: Product | null = null;
  public show: boolean = false;
  public min: number = 10;
  public popup_enable: boolean = true;

  private intervalId: any;
  private subscription: Subscription = new Subscription();
  private isInitialized: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && !this.isInitialized) {
      this.isInitialized = true;
      if (this.popup_enable && window.innerWidth > 768) {
        this.intervalId = setInterval(() => {
          this.show = true;
          this.min = Math.floor(Math.random() * 60) + 1;
          this.randomlySelectProduct();
          setTimeout(() => {
            this.show = false;
          }, 5000);
        }, 20000);
      }
    }
  }

  randomlySelectProduct() {
    this.subscription.add(
      this.product$.subscribe(product => {
        if (!product.data.length) {
          this.relatesProducts();
        } else {
          const randomIndex = Math.floor(Math.random() * product.data.length);
          this.product = product.data[randomIndex];
        }
      })
    );
  }

  relatesProducts() {
    this.subscription.add(
      this.relatesProduct$.subscribe(products => {
        const randomIndex = Math.floor(Math.random() * products.length);
        this.product = products[randomIndex];
      })
    );
  }

  closePopup() {
    this.popup_enable = false;
  }

    ngOnDestroy() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
      this.subscription.unsubscribe();
    }
}
