import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-product-information',
    imports: [CommonModule, TranslateModule],
    templateUrl: './product-information.component.html',
    styleUrl: './product-information.component.scss'
})
export class ProductInformationComponent {

  @Input() product: Product | null;

}
