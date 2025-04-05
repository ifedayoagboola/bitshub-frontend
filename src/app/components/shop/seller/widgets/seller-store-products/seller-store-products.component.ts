import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';

@Component({
    selector: 'app-seller-store-products',
    imports: [],
    templateUrl: './seller-store-products.component.html',
    styleUrl: './seller-store-products.component.scss'
})
export class SellerStoreProductsComponent {

  @Input() store: Stores;

}
