import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { Review } from '../../../../../../shared/interface/review.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoDataComponent } from '../../../../../../shared/components/widgets/no-data/no-data.component';
import { ReviewModalComponent } from '../../../../../../shared/components/widgets/modal/review-modal/review-modal.component';
import { ButtonComponent } from '../../../../../../shared/components/widgets/button/button.component';

@Component({
    selector: 'app-product-review',
    imports: [CommonModule, TranslateModule, NgbModule,
        NoDataComponent, ButtonComponent],
    templateUrl: './product-review.component.html',
    styleUrl: './product-review.component.scss'
})

export class ProductReviewComponent {

  @Input() product: Product | null;
  @Input() reviews: Review[] = [];

  constructor(private modal: NgbModal){}

  openModal(product: Product, type: string){
    const reviewModal = this.modal.open(ReviewModalComponent, { size: 'm', centered: true, windowClass: 'theme-modal-2 review-modal' });
    reviewModal.componentInstance.product = product;
    reviewModal.componentInstance.type = type;
  }
}
