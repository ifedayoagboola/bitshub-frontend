import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription, debounceTime, distinctUntilChanged, interval } from 'rxjs';
import { Category } from '../../../../interface/category.interface';
import { Params } from '../../../../interface/core.interface';
import { Product } from '../../../../interface/product.interface';
import { CategoryService } from '../../../../services/category.service';
import { ProductService } from '../../../../services/product.service';
import { GetSearchByCategory } from '../../../../store/action/category.action';
import { GetProductBySearch } from '../../../../store/action/product.action';
import { CategoryState } from '../../../../store/state/category.state';
import { ProductState } from '../../../../store/state/product.state';
import { ButtonComponent } from '../../button/button.component';
import { NoDataComponent } from '../../no-data/no-data.component';
import { ProductBoxComponent } from '../../product-box/product-box.component';
import { SkeletonProductBoxComponent } from '../../product-box/widgets/skeleton-product-box/skeleton-product-box.component';

@Component({
    selector: 'app-search-modal',
    imports: [CommonModule, ProductBoxComponent, FormsModule, ReactiveFormsModule,
        TranslateModule, ButtonComponent, SkeletonProductBoxComponent, NoDataComponent, RouterModule],
    templateUrl: './search-modal.component.html',
    styleUrl: './search-modal.component.scss'
})
export class SearchModalComponent {

  productBySearch$: Observable<Product[]> = inject(Store).select(ProductState.productBySearch);
  searchCategory$: Observable<Category[]> = inject(Store).select(CategoryState.searchByCategory);

  public products: Product[];
  public skeletonItems = Array.from({ length: 4 }, (_, index) => index);

  public search = new FormControl();
  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 4, // Display per page,
    'status': 1,
    'search': ''
  }
  public textToType = 'Search with brands and categories...';
  public typedText = '';
  public animationSubscription: Subscription | undefined;
blog: any;

  constructor(
    private store: Store,
    public productService: ProductService,
    public categoryService: CategoryService,
    public modal: NgbActiveModal,
    public router: Router){

    this.store.dispatch(new GetProductBySearch(this.filter))
    this.productBySearch$.subscribe((product) => {
      this.products = product;
    })

    this.store.dispatch(new GetSearchByCategory({status: 1, paginate: 4}))
  }

  ngOnInit(){
    this.startTypingAnimation();
    this.search.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()) // Adjust the debounce time as needed (in milliseconds)
      .subscribe((inputValue) => {
        this.filter['search'] = inputValue;
        this.store.dispatch(new GetSearchByCategory({status: 1, paginate: 4, search: inputValue}))
        this.store.dispatch(new GetProductBySearch(this.filter))
        this.productBySearch$.subscribe((product) => {
          this.products = product;
        })
    });
  }

  startTypingAnimation() {
    const charactersArray = this.textToType.split('');
    let currentIndex = 0;
    let eraseMode = false;

    this.animationSubscription = interval(150).subscribe(() => {
      if (!eraseMode) {
        if (currentIndex < charactersArray.length) {
          this.typedText += charactersArray[currentIndex];
          currentIndex++;
        } else {
          eraseMode = true;
        }
      } else {
        if (this.typedText.length > 0) {
          this.typedText = this.typedText.slice(0, -1);
        } else {
          eraseMode = false;
          currentIndex = 0;
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.animationSubscription) {
      this.animationSubscription.unsubscribe();
    }
  }
}
