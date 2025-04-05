import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../interface/product.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsModalComponent } from '../../../../modal/product-details-modal/product-details-modal.component';

@Component({
    selector: 'app-quick-view',
    imports: [],
    templateUrl: './quick-view.component.html',
    styleUrl: './quick-view.component.scss'
})
export class QuickViewComponent {

  @Input() product: Product;
  @Input() class: string;

  constructor(private modal: NgbModal){}

  openModal(product: Product){
    const modal = this.modal.open(ProductDetailsModalComponent, { centered: true, size: 'lg', windowClass: 'theme-modal-2 quick-view-modal'});
    modal.componentInstance.product = product;
  }
}
