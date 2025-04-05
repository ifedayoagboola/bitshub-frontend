import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, inject, Input, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Category, CategoryModel } from '../../../interface/category.interface';
import { Option } from '../../../interface/theme-option.interface';
import { MenuService } from '../../../services/menu.service';
import { GetHeaderCategories } from '../../../store/action/category.action';
import { CategoryState } from '../../../store/state/category.state';
import { MenuComponent } from '../../widgets/menu/menu.component';
import { TopBarComponent } from '../../widgets/top-bar/top-bar.component';
import { CartComponent } from '../widgets/cart/cart.component';
import { HeaderLogoComponent } from '../widgets/header-logo/header-logo.component';
import { SearchComponent } from '../widgets/search/search.component';
import { UserProfileComponent } from '../widgets/user-profile/user-profile.component';


@Component({
    selector: 'app-header-three',
    imports: [CommonModule, TranslateModule, RouterModule,
        TopBarComponent, HeaderLogoComponent, MenuComponent,
        SearchComponent, CartComponent,
        UserProfileComponent],
    templateUrl: './header-three.component.html',
    styleUrl: './header-three.component.scss'
})
export class HeaderThreeComponent {

  category$: Observable<CategoryModel> = inject(Store).select(CategoryState.headerCategory);

  @Input() data: Option | null;
  @Input() logo: string | null | undefined;
  @Input() class: string;
  @Input() sticky: boolean | number | undefined; // Default false

  public stick: boolean = false;
  public categories: Category[];
  public activeCategory: number;
  public isBrowser: boolean;

  constructor(private store: Store,private menuService: MenuService, @Inject(PLATFORM_ID) platformId: object){
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    const categoryIds = this.data?.header.category_ids;

    // Get Category
    this.store.dispatch(new GetHeaderCategories({
      status: 1,
      ids: categoryIds?.join(',')
    }))

    if(categoryIds && categoryIds.length) {
      this.category$.subscribe((res) => {
        if(res){
          this.categories = res.data.filter(category => categoryIds?.includes(category.id))

          if(this.categories.length){
            this.activeCategory = this.categories[0].id;

          }
        }
      })
    }
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if(this.isBrowser) {
      let number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      if (number >= 50 && window.innerWidth > 400) {
        this.stick = true;
      } else {
        this.stick = false;
      }
    }
  }

  mainMenuOpen(){
    this.menuService.mainMenuToggle = true;
  }

}
