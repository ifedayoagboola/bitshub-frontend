import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from '../../../../interface/product.interface';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { CartButtonComponent } from '../widgets/cart-button/cart-button.component';
import { ProductBoxImageVariantComponent } from '../widgets/image-variant/image-variant.component';
import { ProductHoverActionComponent } from '../widgets/product-hover-action/product-hover-action.component';

@Component({
    selector: 'app-product-box-seven',
    imports: [CommonModule, RouterModule, CurrencySymbolPipe, TranslateModule,
        NgbModule, ProductHoverActionComponent,
        CartButtonComponent, ProductBoxImageVariantComponent],
    templateUrl: './product-box-seven.component.html',
    styleUrl: './product-box-seven.component.scss'
})
export class ProductBoxSevenComponent {

  @Input() product: Product;

}
