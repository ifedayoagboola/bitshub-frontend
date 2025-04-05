import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, Observable, Subscription, switchMap } from 'rxjs';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { Category } from '../../../shared/interface/category.interface';
import { ProductModel } from '../../../shared/interface/product.interface';
import { GetProducts } from '../../../shared/store/action/product.action';
import { CategoryState } from '../../../shared/store/state/category.state';
import { ProductState } from '../../../shared/store/state/product.state';
import { CollectionProductsComponent } from '../collection/widgets/collection-products/collection-products.component';
import { SidebarComponent } from '../collection/widgets/sidebar/sidebar.component';

@Component({
    selector: 'app-category',
    imports: [CommonModule, BreadcrumbComponent, SidebarComponent, CollectionProductsComponent],
    templateUrl: './category.component.html',
    styleUrl: './category.component.scss'
})
export class CategoryComponent {

  product$: Observable<ProductModel> = inject(Store).select(ProductState.product);
  category$: Observable<Category> = inject(Store).select(CategoryState.selectedCategory) as Observable<Category>;

  public breadcrumb: breadcrumb = {
    title: "Category",
    items: [{ label: '', active: false }]
  };
  public layout: string = 'collection_category_slider';
  public skeleton: boolean = true;
  public category: Category;
  public activeCategory: string | null;
  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 40, // Display per page,
    'status': 1,
    'field': 'created_at',
    'price': '',
    'category': '',
    'tag': '',
    'sort': 'asc', // ASC, DSC
    'sortBy': 'asc',
    'rating': '',
    'attribute': ''
  };

  public totalItems: number = 0;
  private routerEventsSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store) {
      this.category$.subscribe(category => {
        this.category = category
        this.breadcrumb.title = `Category: ${this.category?.name}`
        this.breadcrumb.items[0].label = this.category?.name
      })

      const category = this.route.snapshot.paramMap.get('slug')
      this.filter = {
        ...this.filter,
        category: category
      }
      this.store.dispatch(new GetProducts(this.filter));
  }


  ngOnInit() {
    this.routerEventsSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      switchMap(() => {
        const category = this.route.snapshot.paramMap.get('slug');
        return this.route.queryParams.pipe(
          switchMap(params => {
            this.filter = {
              page: params['page'] ? params['page'] : 1,
              paginate: 40,
              status: 1,
              category: params['category'] ? params['category'] : category,
              price: params['price'] ? params['price'] : '',
              brand: params['brand'] ? params['brand'] : '',
              tag: params['tag'] ? params['tag'] : '',
              field: params['field'] ? params['field'] : this.filter['field'],
              sortBy: params['sortBy'] ? params['sortBy'] : this.filter['sortBy'],
              rating: params['rating'] ? params['rating'] : '',
              attribute: params['attribute'] ? params['attribute'] : '',
            };
            this.store.dispatch(new GetProducts(this.filter));
            return [];
          })
        );
      })
    ).subscribe();
  }

  private updateFilterAndFetchProducts() {
    if (this.category) {
      this.filter['category'] = this.category.slug;
    }
    this.store.dispatch(new GetProducts(this.filter));
  }

  public changePage(page: number) {
    this.filter['category'] = page;
    this.updateFilterAndFetchProducts();
  }

  public changePaginate(paginate: number) {
    this.filter['paginate'] = paginate;
    this.updateFilterAndFetchProducts();
  }

  ngOnDestroy() {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }
}
