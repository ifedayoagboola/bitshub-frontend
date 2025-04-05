import { CommonModule } from '@angular/common';
import { Component, inject, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product, ProductModel } from '../../../interface/product.interface';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../../../store/state/product.state';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-image-link',
    imports: [CommonModule, RouterModule],
    templateUrl: './image-link.component.html',
    styleUrl: './image-link.component.scss'
})
export class ImageLinkComponent {

  product$: Observable<Product[]> = inject(Store).select(ProductState.productByIds);

  @Input() image: any;
  @Input() bgImage: boolean;
  @Input() class: string;
  @Input() banner_details: boolean = false;
  @Input() placeholder: string;

  public StorageURL = environment.storageURL;

  ngOnChanges(change: SimpleChanges){
    if(change['image']?.currentValue && typeof(change['image']?.currentValue?.redirect_link?.link) === 'number'){
      this.product$.subscribe(res => {
        res.map(product => {
          if(product.id === change['image']?.currentValue?.redirect_link?.link){
            this.image['product_slug'] = product.slug;
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
