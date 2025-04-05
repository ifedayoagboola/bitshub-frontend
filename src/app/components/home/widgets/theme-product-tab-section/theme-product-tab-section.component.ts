import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, Subscription } from 'rxjs';

import { ProductBoxComponent } from '../../../../shared/components/widgets/product-box/product-box.component';

import { Category, CategoryModel } from '../../../../shared/interface/category.interface';
import { Params } from '../../../../shared/interface/core.interface';
import { Product } from '../../../../shared/interface/product.interface';

import { GetCategoryProducts } from '../../../../shared/store/action/product.action';

import { CategoryState } from '../../../../shared/store/state/category.state';
import { ProductState } from '../../../../shared/store/state/product.state';

import { NoDataComponent } from '../../../../shared/components/widgets/no-data/no-data.component';
import { SkeletonProductBoxComponent } from '../../../../shared/components/widgets/product-box/widgets/skeleton-product-box/skeleton-product-box.component';
import { productSlider4 } from '../../../../shared/data/owl-carousel';
import { ProductTabSection } from '../../../../shared/interface/theme.interface';
import { ProductService } from '../../../../shared/services/product.service';

@Component({
    selector: 'app-theme-product-tab-section',
    imports: [CommonModule, ProductBoxComponent, CarouselModule,
              NoDataComponent, SkeletonProductBoxComponent],
    templateUrl: './theme-product-tab-section.component.html',
    styleUrl: './theme-product-tab-section.component.scss'
})
export class ThemeProductTabSectionComponent {

  category$: Observable<CategoryModel> = inject(Store).select(CategoryState.category);
  product$: Observable<Product[]> = inject(Store).select(ProductState.categoryProducts);

  @Input() categoryIds?: number[];
  @Input() slider: boolean = false;
  @Input() style: string;
  @Input() tab_title_class: string;
  @Input() tab_style: string;
  @Input() showItems: number = 4;
  @Input() class: string = 'row row-cols-xl-4 row-cols-md-3 row-cols-2 g-md-4 g-3';
  @Input() type: string;
  @Input() title: ProductTabSection | undefined;
  @Input() product_box_style: string;
  @Input() options: OwlOptions = productSlider4;

  public skeletonItems = Array.from({ length: this.showItems ? this.showItems : this.showItems ? this.showItems : 4 }, (_, index) => index);

  public categories: Category[];
  public categoryProduct: Category[];
  public activeCategory: number;
  private categorySubscription: Subscription

  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 4, // Display per page,
    'status': 1,
    'category_id': '',
  };

  constructor(private store: Store, public productService: ProductService) {}

  ngOnChanges(){
    // Get Category
    this.filter['paginate'] = this.showItems;
    this.skeletonItems = Array.from({ length: this.showItems ? this.showItems : this.showItems ? this.showItems : 4 }, (_, index) => index);
    if(this.categoryIds && this.categoryIds.length) {
      this.categorySubscription = this.category$.subscribe((res) => {
        if(res){
          this.categories = this.getCategoriesByIds(res.data, this.categoryIds!);

          if(this.categories.length){
            this.activeCategory = this.categories[0].id;

            this.filter['category_id'] = this.categories[0].id;

            if(this.filter['category_id']){
              this.store.dispatch(new GetCategoryProducts(this.filter));
            }
          }
        }
      })
    }
  }

  getCategoriesByIds(categories: Category[], ids: number[]): Category[] {
    let matchedCategories: Category[] = [];

    categories.forEach(category => {
        if (ids.includes(category.id)) {
            matchedCategories.push(category);
        }

        if (category.subcategories?.length) {
            const matchedSubcategories = this.getCategoriesByIds(category.subcategories, ids);
            if (matchedSubcategories.length) {
                matchedCategories.push(...matchedSubcategories);
            }
        }
    });

    return matchedCategories;
  }

  changeTab(value: Category){
    this.activeCategory = value.id;

    this.filter['category_id'] = value.id,

    this.store.dispatch(new GetCategoryProducts(this.filter));
  }

  ngOnDestroy() {
    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }
}
