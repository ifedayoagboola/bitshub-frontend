import { Component, inject } from '@angular/core';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { Select, Store } from '@ngxs/store';
import { CompareState } from '../../../shared/store/state/compare.state';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/interface/product.interface';
import { CompareService } from '../../../shared/services/compare.service';
import { DeleteCompare, GetCompare } from '../../../shared/store/action/compare.action';
import { CartAddOrUpdate } from '../../../shared/interface/cart.interface';
import { AddToCart } from '../../../shared/store/action/cart.action';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { compareSlider } from '../../../shared/data/owl-carousel';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';

@Component({
    selector: 'app-compare',
    imports: [CommonModule, TranslateModule, NgbModule, CarouselModule,
        CurrencySymbolPipe, BreadcrumbComponent, NoDataComponent],
    templateUrl: './compare.component.html',
    styleUrl: './compare.component.scss'
})
export class CompareComponent {

  compareItems$: Observable<Product[]> = inject(Store).select(CompareState.compareItems);

  public breadcrumb: breadcrumb = {
    title: "Compare",
    items: [{ label: 'Compare', active: true }]
  }

  public skeletonItems = Array.from({ length: 3 }, (_, index) => index);
  public options = compareSlider;

  constructor(private store: Store, public compareService: CompareService) {
    this.store.dispatch(new GetCompare());
  }

  moveToCart(product: Product) {
    if(product) {
      const params: CartAddOrUpdate = {
        id: null,
        product_id: product?.id,
        product: product ? product : null,
        variation: null,
        variation_id: null,
        quantity: 1
      }
      this.store.dispatch(new AddToCart(params)).subscribe({
        complete: () => {
          this.removeCompare(product.id);
        }
      });
    }
  }

  removeCompare(id: number) {
    this.store.dispatch(new DeleteCompare(id));
  }

}
