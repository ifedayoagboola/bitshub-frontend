import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../../../../../../shared/store/state/product.state';
import { Observable } from 'rxjs';
import { Product } from '../../../../../../shared/interface/product.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProductBoxComponent } from '../../../../../../shared/components/widgets/product-box/product-box.component';

@Component({
    selector: 'app-trending-product',
    imports: [CommonModule, TranslateModule, ProductBoxComponent],
    templateUrl: './trending-product.component.html',
    styleUrl: './trending-product.component.scss'
})
export class TrendingProductComponent {

  relatedProduct$: Observable<Product[]> = inject(Store).select(ProductState.relatedProducts);

  public relatedProducts: Product[] = [];

  ngOnInit() {
    this.relatedProduct$.subscribe(products => {
      this.relatedProducts = products?.length ? products?.filter(product => product?.is_trending) : [];
    });
  }
}
