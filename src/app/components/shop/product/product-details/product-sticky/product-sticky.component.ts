import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Product, Variation } from '../../../../../shared/interface/product.interface';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { ProductService } from '../../../../../shared/services/product.service';
import { ThemeOptionService } from '../../../../../shared/services/theme-option.service';
import { PaymentOptionComponent } from '../widgets/payment-option/payment-option.component';
import { ProductBundleComponent } from '../widgets/product-bundle/product-bundle.component';
import { ProductContentComponent } from '../widgets/product-content/product-content.component';
import { ProductDeliveryInformationComponent } from '../widgets/product-delivery-information/product-delivery-information.component';
import { ProductDetailsTabComponent } from '../widgets/product-details-tab/product-details-tab.component';
import { ProductDetailsComponent } from '../widgets/product-details/product-details.component';
import { ProductDigitalOptionsComponent } from '../widgets/product-digital-options/product-digital-options.component';
import { ProductInformationComponent } from '../widgets/product-information/product-information.component';

@Component({
    selector: 'app-product-sticky',
    imports: [CommonModule, CarouselModule, TranslateModule,
        ProductContentComponent, ProductInformationComponent, ProductDeliveryInformationComponent,
        PaymentOptionComponent, ProductBundleComponent,
        ProductDetailsTabComponent, ProductDetailsComponent,
        ProductDigitalOptionsComponent],
    templateUrl: './product-sticky.component.html',
    styleUrl: './product-sticky.component.scss'
})
export class ProductStickyComponent {

  @Input() product: Product;
  @Input() option: Option | null;

  public selectedVariation: Variation;
  public videType = ['video/mp4', 'video/webm', 'video/ogg'];
  public audioType = ['audio/mpeg', 'audio/wav', 'audio/ogg'];

  constructor(public productService: ProductService,private themeOptionService: ThemeOptionService){}

  selectedVariant(variant: Variation){
    this.selectedVariation = variant;
  }
}
