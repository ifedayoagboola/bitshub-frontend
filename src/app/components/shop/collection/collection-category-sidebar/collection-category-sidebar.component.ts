import { Component, Input } from '@angular/core';
import { Params } from '@angular/router';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { CommonModule } from '@angular/common';
import { CollectionCategoriesComponent } from '../widgets/collection-categories/collection-categories.component';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';

@Component({
    selector: 'app-collection-category-sidebar',
    imports: [CommonModule, CollectionCategoriesComponent, CollectionProductsComponent],
    templateUrl: './collection-category-sidebar.component.html',
    styleUrl: './collection-category-sidebar.component.scss'
})
export class CollectionCategorySidebarComponent {

  @Input() filter: Params;

  constructor(public attributeService: AttributeService) {}

}
