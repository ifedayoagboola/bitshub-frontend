import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { Brand } from '../../../shared/interface/brand.interface';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { Params } from '../../../shared/interface/core.interface';
import { ProductModel } from '../../../shared/interface/product.interface';
import { GetProducts } from '../../../shared/store/action/product.action';
import { BrandState } from '../../../shared/store/state/brand.state';
import { ProductState } from '../../../shared/store/state/product.state';
import { CollectionProductsComponent } from '../collection/widgets/collection-products/collection-products.component';

@Component({
    selector: 'app-brand',
    imports: [BreadcrumbComponent, CollectionProductsComponent],
    templateUrl: './brand.component.html',
    styleUrl: './brand.component.scss'
})
export class BrandComponent {

  product$: Observable<ProductModel> = inject(Store).select(ProductState.product);
  brand$: Observable<Brand> = inject(Store).select(BrandState.selectedBrand) as Observable<Brand>;

  public breadcrumb: breadcrumb = {
    title: "Brand",
    items: [{ label: 'Collections', active: false }]
  };
  public layout: string = 'collection_category_slider';
  public skeleton: boolean = true;
  public brand: Brand;
  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 40, // Display per page,
    'brand': ''
  };

  public totalItems: number = 0;
  private subscriptions: Subscription = new Subscription();

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit() {
    this.subscriptions.add(this.brand$.subscribe(brand => {
      this.brand = brand;
      this.updateBreadcrumb();
      this.updateFilterAndFetchProducts();
    }));

    this.filter['brand'] = this.route.snapshot.paramMap.get('slug');
    this.store.dispatch(new GetProducts(this.filter));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private updateBreadcrumb() {
    this.breadcrumb.title = `Brand: ${this.brand?.name}`;
    this.breadcrumb.items[0].label = this.brand?.name;
  }

  private updateFilterAndFetchProducts() {
    if (this.brand) {
      this.filter['brand'] = this.brand.slug;
    }
    this.store.dispatch(new GetProducts(this.filter));
  }

  public changePage(page: number) {
    this.filter['page'] = page;
    this.updateFilterAndFetchProducts();
  }

  public changePaginate(paginate: number) {
    this.filter['paginate'] = paginate;
    this.updateFilterAndFetchProducts();
  }
}
