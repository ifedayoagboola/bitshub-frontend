import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Product } from '../../../../interface/product.interface';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { CartButtonComponent } from '../widgets/cart-button/cart-button.component';
import { ProductBoxImageVariantComponent } from '../widgets/image-variant/image-variant.component';
import { QuickViewComponent } from '../widgets/product-hover-action/quick-view/quick-view.component';
import { WishlistComponent } from '../widgets/product-hover-action/wishlist/wishlist.component';

@Component({
    selector: 'app-product-box-eight',
    imports: [CommonModule, NgbModule, RouterModule, TranslateModule,
        CurrencySymbolPipe, QuickViewComponent, WishlistComponent, CartButtonComponent, ProductBoxImageVariantComponent],
    templateUrl: './product-box-eight.component.html',
    styleUrl: './product-box-eight.component.scss'
})
export class ProductBoxEightComponent {

  @Input() product: Product;

}
