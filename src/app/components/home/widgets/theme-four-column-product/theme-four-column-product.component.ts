import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ThemeProductComponent } from '../theme-product/theme-product.component';

import { BooksSliderProduct, SliderProduct } from '../../../../shared/interface/theme.interface';
import { NoDataComponent } from '../../../../shared/components/widgets/no-data/no-data.component';

@Component({
    selector: 'app-theme-four-column-product',
    imports: [CommonModule, ThemeProductComponent, NoDataComponent],
    templateUrl: './theme-four-column-product.component.html',
    styleUrl: './theme-four-column-product.component.scss'
})
export class ThemeFourColumnProductComponent {

  @Input() data?: SliderProduct;
  @Input() style: string;

}
