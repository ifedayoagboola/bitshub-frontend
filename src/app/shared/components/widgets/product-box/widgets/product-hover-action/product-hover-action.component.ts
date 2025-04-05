import { Component, Input } from '@angular/core';
import { Product } from '../../../../../interface/product.interface';
import { Store } from '@ngxs/store';
import { AddToWishlist, DeleteWishlist } from '../../../../../store/action/wishlist.action';
import { AddToCompare } from '../../../../../store/action/compare.action';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsModalComponent } from '../../../modal/product-details-modal/product-details-modal.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { QuickViewComponent } from './quick-view/quick-view.component';
import { CompareComponent } from './compare/compare.component';

@Component({
    selector: 'app-product-hover-action',
    imports: [WishlistComponent, QuickViewComponent, CompareComponent],
    templateUrl: './product-hover-action.component.html',
    styleUrl: './product-hover-action.component.scss'
})
export class ProductHoverActionComponent {

  @Input() product: Product;
  @Input() showAction: string[] = ['view', 'wishlist', 'compare'];
  @Input() class: string;


}
