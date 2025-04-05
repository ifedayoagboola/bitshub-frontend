import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../../../../shared/pipe/currency.pipe';

@Component({
    selector: 'app-product-wholesales',
    imports: [CommonModule, TranslateModule, CurrencySymbolPipe],
    templateUrl: './product-wholesales.component.html',
    styleUrl: './product-wholesales.component.scss'
})
export class ProductWholesalesComponent {

  @Input() product: Product | null;

}
