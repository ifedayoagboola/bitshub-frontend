import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Category, CategoryModel } from '../../../../interface/category.interface';
import { GetFooterCategories } from '../../../../store/action/category.action';
import { CategoryState } from '../../../../store/state/category.state';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-footer-categories',
    imports: [CommonModule, RouterModule],
    templateUrl: './footer-categories.component.html',
    styleUrl: './footer-categories.component.scss'
})
export class FooterCategoriesComponent {

  @Input() categoryIds: number[];

  category$: Observable<CategoryModel> = inject(Store).select(CategoryState.footerCategory);

  public categories: Category[];

  constructor(private store: Store){}

  ngOnInit(){
    this.store.dispatch(new GetFooterCategories({
      status: 1,
      ids: this.categoryIds?.join(',')
    }))

    if(this.categoryIds && this.categoryIds.length) {
      this.category$.subscribe((res) => {
        if(res){
          this.categories = res.data.filter(category => this.categoryIds?.includes(category.id))
        }
      })
    }
  }


}
