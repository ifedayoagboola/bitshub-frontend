import { Component, Input } from '@angular/core';
import { Stores } from '../../../../../shared/interface/store.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-seller-store-social-media',
    imports: [CommonModule, TranslateModule],
    templateUrl: './seller-store-social-media.component.html',
    styleUrl: './seller-store-social-media.component.scss'
})
export class SellerStoreSocialMediaComponent {

  @Input() store: Stores;

}
