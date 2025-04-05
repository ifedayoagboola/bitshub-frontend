import { Component, inject } from '@angular/core';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../../../shared/store/state/product.state';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { Product, ProductModel } from '../../../shared/interface/product.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Params } from '../../../shared/interface/core.interface';
import { ProductService } from '../../../shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GetProducts } from '../../../shared/store/action/product.action';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProductBoxComponent } from '../../../shared/components/widgets/product-box/product-box.component';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { SkeletonProductBoxComponent } from '../../../shared/components/widgets/product-box/widgets/skeleton-product-box/skeleton-product-box.component';

@Component({
    selector: 'app-search',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, TranslateModule,
        BreadcrumbComponent, ButtonComponent, ProductBoxComponent,
        NoDataComponent, SkeletonProductBoxComponent],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss'
})
export class SearchComponent {

  public breadcrumb: breadcrumb = {
    title: "Search",
    items: [{ label: "Search", active: true }]
  }

  product$: Observable<ProductModel> = inject(Store).select(ProductState.product);

  public products: Product[];
  public search = new FormControl();
  public totalItems: number = 0;
  public skeletonItems = Array.from({ length: 12 }, (_, index) => index);
  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 12, // Display per page,
    'status': 1,
    'search': ''
  }

  constructor(
      private store: Store,
      public productService: ProductService,
      private route: ActivatedRoute,
      public router: Router){

   this.route.queryParams.subscribe(params => {
    if(params['search']) {
      this.filter['search'] = params['search'];
      this.search.patchValue(params['search'] ? params['search'] : '')
    }
    this.store.dispatch(new GetProducts(this.filter));

    this.product$.subscribe((products) => {
      this.products = products.data
    })
   });
  }

  ngOnInit(){
    this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()) // Adjust the debounce time as needed (in milliseconds)
      .subscribe((inputValue) => {
      if(inputValue.length >= 0){
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            search: inputValue
          }
        });
        this.filter['search'] = inputValue;
      }
    });
  }

  searchProduct(){
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.search.value
      }
    });
    this.filter['search'] = this.search.value;
  }
}
