import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Category, CategoryModel } from '../../../../../../shared/interface/category.interface';
import { Params } from '../../../../../../shared/interface/core.interface';
import { SearchFilterPipe } from '../../../../../../shared/pipe/search-filter.pipe';
import { CategoryState } from '../../../../../../shared/store/state/category.state';
import { NoDataComponent } from '../../../../../../shared/components/widgets/no-data/no-data.component';
import { GetCategories } from '../../../../../../shared/store/action/category.action';

@Component({
    selector: 'app-collection-category-filter',
    imports: [CommonModule, TranslateModule, FormsModule, SearchFilterPipe, NoDataComponent],
    templateUrl: './collection-category-filter.component.html',
    styleUrl: './collection-category-filter.component.scss'
})
export class CollectionCategoryFilterComponent {

  category$: Observable<CategoryModel> = inject(Store).select(CategoryState.category);

  @Input() filter: Params;

  public categories: Category[];
  public selectedCategories: string[] = [];
  public searchText: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store){
      this.store.dispatch(new GetCategories());
    }

  ngOnInit(){
    this.category$.subscribe(res => {
      this.categories = res.data.filter(category => category.type == 'product')});
  }

  ngOnChanges() {
    this.selectedCategories = this.filter['category'] ? this.filter['category'].split(',') : [];
  }

  applyFilter(event: Event) {
    const index = this.selectedCategories.indexOf((<HTMLInputElement>event?.target)?.value);  // checked and unchecked value

    if ((<HTMLInputElement>event?.target)?.checked)
      this.selectedCategories.push((<HTMLInputElement>event?.target)?.value); // push in array cheked value
    else
      this.selectedCategories.splice(index,1);  // removed in array unchecked value

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        category: this.selectedCategories.length ? this.selectedCategories?.join(",") : null,
        page: 1
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
  }

  // check if the item are selected
  checked(item: string){
    if(this.selectedCategories?.indexOf(item) != -1){
      return true;
    }
    return false;
  }

}
