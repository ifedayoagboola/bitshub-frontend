import { Component, inject, Input } from '@angular/core';
import { Params } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { AttributeState } from '../../../../../shared/store/state/attribute.state';
import { Observable } from 'rxjs';
import { AttributeModel } from '../../../../../shared/interface/attribute.interface';
import { AttributeService } from '../../../../../shared/services/attribute.service';
import { GetAttributes } from '../../../../../shared/store/action/attribute.action';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CollectionCategoryFilterComponent } from '../filter/collection-category-filter/collection-category-filter.component';
import { CollectionAttributeFilterComponent } from '../filter/collection-attribute-filter/collection-attribute-filter.component';
import { CollectionPriceFilterComponent } from '../filter/collection-price-filter/collection-price-filter.component';
import { CollectionRatingFilterComponent } from '../filter/collection-rating-filter/collection-rating-filter.component';
import { CollectionBrandFilterComponent } from '../filter/collection-brand-filter/collection-brand-filter.component';
import { CollectionFilterComponent } from '../filter/collection-filter/collection-filter.component';
import { TranslateModule } from '@ngx-translate/core';
import { SkeletonCollectionSidebarComponent } from '../skeleton-collection-sidebar/skeleton-collection-sidebar.component';

@Component({
    selector: 'app-collection-sidebar',
    imports: [CommonModule, NgbModule, TranslateModule, CollectionCategoryFilterComponent,
        CollectionAttributeFilterComponent, CollectionPriceFilterComponent, CollectionRatingFilterComponent,
        CollectionBrandFilterComponent, CollectionFilterComponent, SkeletonCollectionSidebarComponent],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input() filter: Params;
  @Input() sidebarPopup: boolean;
  @Input() hideFilter: string[] = [];

  attribute$: Observable<AttributeModel> = inject(Store).select(AttributeState.attribute);

  constructor(private store: Store,
    public attributeService: AttributeService) {
    this.store.dispatch(new GetAttributes({ status: 1}));
  }

  closeCanvasMenu() {
    this.attributeService.offCanvasMenu = false;
  }


}
