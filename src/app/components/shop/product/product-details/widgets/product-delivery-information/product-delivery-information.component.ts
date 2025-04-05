import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-product-delivery-information',
    imports: [CommonModule, TranslateModule],
    templateUrl: './product-delivery-information.component.html',
    styleUrl: './product-delivery-information.component.scss'
})
export class ProductDeliveryInformationComponent {

  @Input() product: Product | null;

}
