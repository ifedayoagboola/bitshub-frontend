import { Component, Input } from '@angular/core';
import { Params } from '../../../../shared/interface/core.interface';
import { collectionCategorySlider } from '../../../../shared/data/owl-carousel';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../widgets/sidebar/sidebar.component';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';
import { CollectionCategoriesComponent } from '../widgets/collection-categories/collection-categories.component';

@Component({
    selector: 'app-collection-category-slider',
    imports: [CommonModule, SidebarComponent, CollectionProductsComponent,
        CollectionCategoriesComponent],
    templateUrl: './collection-category-slider.component.html',
    styleUrl: './collection-category-slider.component.scss'
})
export class CollectionCategorySliderComponent {

  @Input() filter: Params;

  public categorySlider = collectionCategorySlider;

  constructor(public attributeService: AttributeService) {}
}
