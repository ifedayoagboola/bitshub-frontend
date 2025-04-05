import { Component, inject, Input } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesComponent } from '../../../../../shared/components/widgets/categories/categories.component';
import { Select, Store } from '@ngxs/store';
import { ThemeOptionState } from '../../../../../shared/store/state/theme-option.state';
import { Observable, of } from 'rxjs';
import { Option } from '../../../../../shared/interface/theme-option.interface';
import { CommonModule } from '@angular/common';
import { GetCategories } from '../../../../../shared/store/action/category.action';

@Component({
    selector: 'app-collection-categories',
    imports: [CommonModule, CategoriesComponent],
    templateUrl: './collection-categories.component.html',
    styleUrl: './collection-categories.component.scss'
})
export class CollectionCategoriesComponent {

  @Input() style: string = 'vertical';
  @Input() image: string;
  @Input() theme: string;
  @Input() title: string;
  @Input() sliderOption: OwlOptions;

  public categoryIds: number[];

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  constructor(private store: Store){

    this.themeOption$.subscribe((category) => {
      this.categoryIds = category?.collection?.collection_categories_ids
    })

    // Get Category
    let getCategory$;
    if(this.categoryIds?.length){
      getCategory$ = this.store.dispatch(new GetCategories({
        status: 1,
        ids: this.categoryIds?.join(',')
      }))
    } else { getCategory$ = of(null); }

  }

}
