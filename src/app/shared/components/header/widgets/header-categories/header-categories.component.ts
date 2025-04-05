import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Category, CategoryModel } from '../../../../interface/category.interface';
import { GetHeaderCategories } from '../../../../store/action/category.action';
import { CategoryState } from '../../../../store/state/category.state';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header-categories',
    imports: [RouterModule, CommonModule],
    templateUrl: './header-categories.component.html',
    styleUrl: './header-categories.component.scss'
})
export class HeaderCategoriesComponent {

  headerCategory$: Observable<CategoryModel> = inject(Store).select(CategoryState.headerCategory);

  @Input() categoryIds: number[];

  public categories: Category[];

  constructor(private store: Store){}

  ngOnInit(){
    this.store.dispatch(new GetHeaderCategories({
      status: 1,
      ids: this.categoryIds?.join(',')
    }))

    if(this.categoryIds && this.categoryIds.length) {
      this.headerCategory$.subscribe((res) => {
        if(res){
          this.categories = res.data.filter(category => this.categoryIds?.includes(category.id))
        }
      })
    }
  }
}
