import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../../../../shared/store/state/product.state';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { ProductModel } from '../../../../shared/interface/product.interface';
import { ThemeOptionState } from '../../../../shared/store/state/theme-option.state';
import { breadcrumb } from '../../../../shared/interface/breadcrumb.interface';
import { Params } from '../../../../shared/interface/core.interface';
import { ActivatedRoute } from '@angular/router';
import { GetProducts } from '../../../../shared/store/action/product.action';
import { StoreState } from '../../../../shared/store/state/store.state';
import { Stores } from '../../../../shared/interface/store.interface';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { CollectionProductsComponent } from '../../collection/widgets/collection-products/collection-products.component';
import { collectionCategorySlider } from '../../../../shared/data/owl-carousel';
import { SidebarComponent } from '../../collection/widgets/sidebar/sidebar.component';
import { SellerStoreLogoComponent } from '../widgets/seller-store-logo/seller-store-logo.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SellerStoreSocialMediaComponent } from '../widgets/seller-store-social-media/seller-store-social-media.component';

@Component({
    selector: 'app-seller-details',
    // ,
    imports: [CommonModule, BreadcrumbComponent, CollectionProductsComponent, SidebarComponent, SellerStoreLogoComponent, NgbRatingModule, TranslateModule, SellerStoreSocialMediaComponent],
    templateUrl: './seller-details.component.html',
    styleUrl: './seller-details.component.scss'
})
export class SellerDetailsComponent {

  product$: Observable<ProductModel> = inject(Store).select(ProductState.product);
  themeOptions$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;
  store$: Observable<Stores> = inject(Store).select(StoreState.selectedStore) as Observable<Stores>;

  public breadcrumb: breadcrumb = {
    title: "Seller",
    items: []
  };
  public layout: string = 'basic_store_details';
  public skeleton: boolean = true;
  public selectedStore: Stores;
  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 40, // Display per page,
    'status': 1,
    'field': 'price',
    'price': '',
    'category': '',
    'tag': '',
    'sort': '', // ASC, DSC
    'sortBy': '',
    'rating': '',
    'attribute': ''
  };

  public totalItems: number = 0;

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    // Subscribe to store changes
    this.store$.subscribe(store => {
      this.selectedStore = store;
    });

    // Combine latest values from params and queryParams observables
    combineLatest([
      this.route.params,
      this.route.queryParams
    ]).subscribe(([params, queryParams]) => {
      // Update filter based on query params
      this.filter = {
        page: queryParams['page'] || 1,
        paginate: 40,
        status: 1,
        field: queryParams['field'] || '',
        price: queryParams['price'] || '',
        category: queryParams['category'] || '',
        tag: queryParams['tag'] || '',
        sort: queryParams['sort'] || '',
        sortBy: queryParams['sortBy'] || '',
        rating: queryParams['rating'] || '',
        attribute: queryParams['attribute'] || '',
        store_slug: params['slug'] || '',
        layout: queryParams['layout'] || 'basic_store_details'
      };

      // Update breadcrumb
      this.breadcrumb.items = [];
      this.breadcrumb.title = this.filter['store_slug'] ? this.filter['store_slug'] : 'Seller';
      this.breadcrumb.items.push({ label: 'Seller Store', active: true }, { label: this.breadcrumb.title, active: false });

      // Dispatch action to fetch products
      this.store.dispatch(new GetProducts(this.filter));

      // If layout is not in query params, set default layout
      if (!queryParams['layout']) {
        this.layout = 'basic_store_details';
      } else {
        this.layout = queryParams['layout'];
      }

      // Update filter with layout
      this.filter['layout'] = this.layout;
    });

    // Subscribe to product store to get total items
    this.product$.subscribe(product => this.totalItems = product?.total);
    // this.store.select('products').subscribe(product => {
    //   this.totalItems = product?.total;
    // });
  }
}
