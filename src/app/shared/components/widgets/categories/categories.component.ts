import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Observable } from 'rxjs';
import { categorySlider } from '../../../data/owl-carousel';
import { Category, CategoryModel } from '../../../interface/category.interface';
import { CategoryState } from '../../../store/state/category.state';
import { ButtonComponent } from '../button/button.component';
import { NoDataComponent } from '../no-data/no-data.component';
import { AttributeService } from '../../../services/attribute.service';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'app-categories',
    imports: [CommonModule, CarouselModule, TranslateModule, RouterModule,
        ButtonComponent, NoDataComponent],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
})
export class CategoriesComponent {

  category$: Observable<CategoryModel> = inject(Store).select(CategoryState.category);

  @Input() categoryIds: number[] = [];
  @Input() style: string = 'vertical';
  @Input() image?: string;
  @Input() slider: boolean;
  @Input() options: OwlOptions = categorySlider;

  public categories: Category[];
  public selectedCategorySlug: string[] = [];
  public StorageURL = environment.storageURL;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private attributeService: AttributeService) {
    this.route.queryParams.subscribe(params => {
      this.selectedCategorySlug = params['category'] ? params['category'].split(',') : [];
    });
    this.category$.subscribe(res => this.categories = res.data.map(category => category ));
  }

  ngOnChanges() {
    if(this.categoryIds && this.categoryIds.length) {
      this.category$.subscribe(res => this.categories = this.getCategoriesByIds(res.data, this.categoryIds!));
    }

    if(this.style == 'vegetable'){
      this.options = {
        ...this.options,
        responsive: {
          ...this.options.responsive,
          768: {
            items: 4
          },
          900: {
            items: 5
          },
          1300: {
            items: 7
          },
        }
      }
    }
  }

  redirectToCollection(slug: string) {
    let index = this.selectedCategorySlug.indexOf(slug);
    if(index === -1)
      this.selectedCategorySlug.push(slug);
    else
      this.selectedCategorySlug.splice(index,1);

    this.router.navigate(['/collections'], {
      relativeTo: this.route,
      queryParams: {
        category: this.selectedCategorySlug.length ? this.selectedCategorySlug?.join(',') : null
      },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    });
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


  closeCanvasMenu() {
    this.attributeService.offCanvasMenu = false;
  }
}
