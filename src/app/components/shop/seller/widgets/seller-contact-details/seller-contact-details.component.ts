import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-seller-contact-details',
    imports: [TranslateModule],
    templateUrl: './seller-contact-details.component.html',
    styleUrl: './seller-contact-details.component.scss'
})
export class SellerContactDetailsComponent {

  @Input() store: Stores;

}
