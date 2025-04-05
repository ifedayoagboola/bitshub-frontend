import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Product } from '../../../../../../interface/product.interface';
import { AddToCompare } from '../../../../../../store/action/compare.action';
import { TranslateModule } from '@ngx-translate/core';
import { CompareState } from '../../../../../../store/state/compare.state';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-compare',
    imports: [TranslateModule, CommonModule, RouterModule],
    templateUrl: './compare.component.html',
    styleUrl: './compare.component.scss'
})
export class CompareComponent {

  compareItems$: Observable<Product[]> = inject(Store).select(CompareState.compareItems);

  @Input() product: Product;
  @Input() text: string = '';

  constructor(private store: Store){}

  addToCompare(product: Product){
    this.store.dispatch(new AddToCompare({ product: product }));
  }
}
