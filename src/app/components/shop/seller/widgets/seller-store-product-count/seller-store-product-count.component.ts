import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-seller-store-product-count',
    imports: [RouterModule, TranslateModule],
    templateUrl: './seller-store-product-count.component.html',
    styleUrl: './seller-store-product-count.component.scss'
})
export class SellerStoreProductCountComponent {

  @Input() store: Stores;

}
