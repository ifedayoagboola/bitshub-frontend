import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../../../shared/store/state/product.state';
import { Observable } from 'rxjs';
import { ProductModel } from '../../../shared/interface/product.interface';
import { ThemeOptionState } from '../../../shared/store/state/theme-option.state';
import { Option } from '../../../shared/interface/theme-option.interface';
import { Params } from '../../../shared/interface/core.interface';
import { GetMoreProduct, GetProducts } from '../../../shared/store/action/product.action';
import { ActivatedRoute } from '@angular/router';
import { CollectionLeftSidebarComponent } from './collection-left-sidebar/collection-left-sidebar.component';
import { CollectionRightSidebarComponent } from './collection-right-sidebar/collection-right-sidebar.component';
import { CollectionNoSidebarComponent } from './collection-no-sidebar/collection-no-sidebar.component';
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionTopFilterComponent } from './collection-top-filter/collection-top-filter.component';
import { CollectionCategorySliderComponent } from './collection-category-slider/collection-category-slider.component';
import { CollectionCategorySidebarComponent } from './collection-category-sidebar/collection-category-sidebar.component';
import { CollectionSidebarPopupComponent } from './collection-sidebar-popup/collection-sidebar-popup.component';
import { CollectionProductInfiniteScrollComponent } from './collection-product-infinite-scroll/collection-product-infinite-scroll.component';


@Component({
    selector: 'app-collection',
    imports: [CommonModule, BreadcrumbComponent, CollectionLeftSidebarComponent,
        CollectionRightSidebarComponent, CollectionNoSidebarComponent, CollectionListComponent,
        CollectionTopFilterComponent, CollectionCategorySliderComponent, CollectionCategorySidebarComponent,
        CollectionSidebarPopupComponent, CollectionProductInfiniteScrollComponent],
    templateUrl: './collection.component.html',
    styleUrl: './collection.component.scss'
})
export class CollectionComponent {

  product$: Observable<ProductModel> = inject(Store).select(ProductState.product)
  themeOptions$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public layout: string = 'collection_category_slider';
  public skeleton: boolean = true;
  public breadcrumb: breadcrumb = {
    title: "Collections",
    items: [{ label: 'Collections', active: false }]
  };

  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 12, // Display per page,
    'status': 1,
    'field': 'created_at',
    'price': '',
    'category': '',
    'tag': '',
    'sort': 'asc', // ASC, DSC
    'sortBy': 'asc',
    'rating': '',
    'attribute': '',
    'brand': '',
  };

  public scrollFilter: Params = {
    'page': 1,
    'paginate': 9
  }

  public totalItems: number = 0;

  constructor(private route: ActivatedRoute,
    private store: Store) {

    // Get Query params..
    this.route.queryParams.subscribe(params => {
      this.filter = {
        'page': params['page'] ? params['page'] : 1,
        'paginate': params['paginate'] ? params['paginate'] : 12,
        'status': 1,
        'field': params['field'] ? params['field'] : this.filter['field'],
        'price': params['price'] ? params['price'] : '',
        'category': params['category'] ? params['category'] : '',
        'tag': params['tag'] ? params['tag'] : '',
        'sortBy': params['sortBy'] ? params['sortBy'] : this.filter['sortBy'],
        'rating': params['rating'] ? params['rating'] : '',
        'attribute': params['attribute'] ? params['attribute'] : '',
        'brand': params['brand'] ? params['brand'] : ''
      }

      this.scrollFilter = {
        ...this.filter,
        'page': this.scrollFilter['page'],
        'paginate': this.scrollFilter['paginate']
      }




      this.store.dispatch(new GetProducts(this.filter));
      // Params For Demo Purpose only
      if(params['layout']) {
        this.layout = params['layout'];

        if(this.layout == 'collection_product_infinite_scroll'){
          this.store.dispatch(new GetMoreProduct(this.scrollFilter));
        }
      } else {
        // Get Collection Layout
        this.themeOptions$.subscribe(option => {
          this.layout = option?.collection && option?.collection?.collection_layout
            ? option?.collection?.collection_layout : 'collection_category_slider';
        });
      }

      this.filter['layout'] = this.layout;
    });

    this.product$.subscribe(product => this.totalItems = product?.total);
  }

}
