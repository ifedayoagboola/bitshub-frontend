import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UpdateProductBox } from '../../../../store/action/theme-option.action';
import { ThemeOptionState } from '../../../../store/state/theme-option.state';

@Component({
    selector: 'app-demo-product-box',
    imports: [TranslateModule],
    templateUrl: './demo-product-box.component.html',
    styleUrl: './demo-product-box.component.scss'
})
export class DemoProductBoxComponent {

  productBox$: Observable<string> = inject(Store).select(ThemeOptionState.productBox);

  public productBox = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
  public variant: string;

  constructor(private store: Store){
    this.productBox$.subscribe(res => this.variant = res)
  }

  selectProductBox(number: string){
    this.store.dispatch(new UpdateProductBox(`product_box_${number}`))
    this.variant = `product_box_${number}`
  }
}
