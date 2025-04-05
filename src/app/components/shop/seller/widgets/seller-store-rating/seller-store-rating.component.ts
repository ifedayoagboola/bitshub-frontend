import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-seller-store-rating',
    imports: [TranslateModule, NgbModule],
    templateUrl: './seller-store-rating.component.html',
    styleUrl: './seller-store-rating.component.scss'
})
export class SellerStoreRatingComponent {

  @Input() store: Stores;

}
