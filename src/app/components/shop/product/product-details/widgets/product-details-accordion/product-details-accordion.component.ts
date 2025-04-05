import { Component, Input } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductInformationComponent } from '../product-information/product-information.component';
import { ProductDeliveryInformationComponent } from '../product-delivery-information/product-delivery-information.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-product-details-accordion',
    imports: [CommonModule, NgbModule, TranslateModule, ProductInformationComponent,
        ProductDeliveryInformationComponent],
    templateUrl: './product-details-accordion.component.html',
    styleUrl: './product-details-accordion.component.scss'
})
export class ProductDetailsAccordionComponent {

  @Input() product: Product;

}
