import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Category } from '../../../../../interface/category.interface';
import { Product } from '../../../../../interface/product.interface';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../../../../../store/state/product.state';
import { Observable } from 'rxjs';
import { CategoryService } from '../../../../../services/category.service';
import { ProductService } from '../../../../../services/product.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HighlighterPipe } from '../../../../../pipe/highlighter.pipe';
import { MenuService } from '../../../../../services/menu.service';

@Component({
    selector: 'app-search-dropdown',
    imports: [CommonModule, TranslateModule, RouterModule,
        HighlighterPipe],
    templateUrl: './search-dropdown.component.html',
    styleUrl: './search-dropdown.component.scss'
})
export class SearchDropdownComponent {

  @Input() term : string;
  @Input() isOpenResult : boolean;
  @Input() selectedResultIndex: number;
  @Input() categories: Category[];
  @Input() products: Product[];
  @Input() selectedCategory: String;

  @ViewChild('resultsContainer') resultsContainer: ElementRef;

  productBySearch$: Observable<Product[]> = inject(Store).select(ProductState.productBySearch);

  public skeleton = Array.from({ length: 3 }, (_, index) => index);

  constructor(
    public categoryService: CategoryService,
    public productService: ProductService,
    public router: Router,
    public menuService: MenuService){}

  reDirectCategory(slug: string){
    this.router.navigate(['/collections'], {
      queryParams: {
        category: slug ? slug : null
      },
      skipLocationChange: false  // do trigger navigation
    })
    this.term = '';
    this.menuService.isOpenSearch = false
  }

}
