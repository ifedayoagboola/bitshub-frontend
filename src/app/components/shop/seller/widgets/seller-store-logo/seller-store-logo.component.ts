import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-seller-store-logo',
    imports: [RouterModule],
    templateUrl: './seller-store-logo.component.html',
    styleUrl: './seller-store-logo.component.scss'
})
export class SellerStoreLogoComponent {

  @Input() store: Stores;

}
