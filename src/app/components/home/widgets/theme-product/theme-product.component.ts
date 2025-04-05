import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { ProductBoxComponent } from '../../../../shared/components/widgets/product-box/product-box.component';

import { Product } from '../../../../shared/interface/product.interface';
import { ProductService } from '../../../../shared/services/product.service';
import { ProductState } from '../../../../shared/store/state/product.state';
import { NoDataComponent } from '../../../../shared/components/widgets/no-data/no-data.component';
import { horizontalProductSlider, productSlider } from '../../../../shared/data/owl-carousel';


@Component({
    selector: 'app-theme-product',
    imports: [CommonModule, ProductBoxComponent, CarouselModule, NoDataComponent],
    templateUrl: './theme-product.component.html',
    styleUrl: './theme-product.component.scss'
})
export class ThemeProductComponent {

  @Input() productIds: number[] = [];
  @Input() style: string;
  @Input() options: OwlOptions = productSlider;
  @Input() slider: boolean;
  @Input() class: string;
  @Input() type: string;
  @Input() product_box_style: string;

  public products: Product[] = [];
  public horizontalSliderOption = horizontalProductSlider;

  product$: Observable<Product[]> = inject(Store).select(ProductState.productByIds);

  constructor(public productService: ProductService) {}

  ngOnChanges() {
    if (Array.isArray(this.productIds) && this.productIds.length) {
      this.product$.subscribe(products => {
        this.products = products.filter(product => this.productIds?.includes(product.id));
      });
    }
  }
}
