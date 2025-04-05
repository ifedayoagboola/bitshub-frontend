import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { LoaderState } from '../../../store/state/loader.state';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../../../interface/product.interface';
import { ProductState } from '../../../store/state/product.state';

@Component({
    selector: 'app-button',
    imports: [CommonModule, RouterModule],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() class: string;
  @Input() iconClass: string | null;
  @Input() id: string;
  @Input() label: string;
  @Input() type: string = 'submit';
  @Input() spinner: boolean = true;
  @Input() disabled: boolean = false;
  @Input() data: any;

  public buttonId: string | null;

  spinnerStatus$: Observable<boolean> = inject(Store).select(LoaderState.buttonSpinner) as Observable<boolean>;
  product$: Observable<Product[]> = inject(Store).select(ProductState.productByIds);

  constructor() {
    this.spinnerStatus$.subscribe(res => {
      if(res == false) {
        this.buttonId = null;
      }
    });
  }

  public onClick(id: string) {
    this.buttonId = id;
  }

  ngOnChanges(change: SimpleChanges){
    if(change['data']?.currentValue && typeof(change['data']?.currentValue?.redirect_link?.link) === 'number'){
      this.product$.subscribe(res => {
        res.map(product => {
          if(product.id === change['data']?.currentValue?.redirect_link?.link){
            this.data['product_slug'] = product.slug;
          }
        })
      })

    }
  }

  getProductSlug(id: number, products: Product[]){
    let product = products.find(product => {
      product.id === id
    });
    return product ? product.slug : null;
  }
}
