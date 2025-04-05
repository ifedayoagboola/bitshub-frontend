import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { Option } from '../../../../../../shared/interface/theme-option.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../../../../environments/environment';

@Component({
    selector: 'app-payment-option',
    imports: [CommonModule, TranslateModule],
    templateUrl: './payment-option.component.html',
    styleUrl: './payment-option.component.scss'
})
export class PaymentOptionComponent {

  @Input() product: Product;
  @Input() option: Option | null;

  public StorageURL = environment.storageURL;

}
