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
import { WishlistComponent } from '../widgets/product-hover-action/wishlist/wishlist.component';

@Component({
    selector: 'app-product-box-ten',
    imports: [CommonModule, RouterModule, CurrencySymbolPipe, TranslateModule,
        NgbModule, ProductHoverActionComponent,
        CartButtonComponent, ProductBoxImageVariantComponent, WishlistComponent],
    templateUrl: './product-box-ten.component.html',
    styleUrl: './product-box-ten.component.scss'
})
export class ProductBoxTenComponent {

  @Input() product: Product;

}
