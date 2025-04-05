import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { forkJoin, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { CategoriesComponent } from '../../../shared/components/widgets/categories/categories.component';
import { productSlider2, productSlider3 } from '../../../shared/data/owl-carousel';
import { DigitalDownload } from '../../../shared/interface/theme.interface';
import { ThemeOptionService } from '../../../shared/services/theme-option.service';
import { GetBlogs } from '../../../shared/store/action/blog.action';
import { GetCategories } from '../../../shared/store/action/category.action';
import { GetProductByIds } from '../../../shared/store/action/product.action';
import { ThemeBlogComponent } from '../widgets/theme-blog/theme-blog.component';
import { ThemeProductTabSectionComponent } from '../widgets/theme-product-tab-section/theme-product-tab-section.component';
import { ThemeProductComponent } from '../widgets/theme-product/theme-product.component';
import { ThemeTitleComponent } from '../widgets/theme-title/theme-title.component';

@Component({
    selector: 'app-digital-download',
    imports: [CommonModule, CategoriesComponent, ThemeTitleComponent,
        ThemeProductComponent, ThemeProductTabSectionComponent, ThemeBlogComponent, TranslateModule,
        ButtonComponent],
    templateUrl: './digital-download.component.html',
    styleUrl: './digital-download.component.scss'
})
export class DigitalDownloadComponent {


  @Input() data?: DigitalDownload;
  @Input() slug?: string;
  private platformId: boolean;
  public productSlider3 = productSlider3;
  public productSlider2 = productSlider2;
  public StorageURL = environment.storageURL;

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) platformId: Object,
    private themeOptionService: ThemeOptionService) {
    this.platformId = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.data?.slug == this.slug) {

      // Get Products
      let getProducts$
      if (this.data?.content?.products_ids?.length && this.data?.content?.products_list?.status) {
        getProducts$ = this.store.dispatch(new GetProductByIds({
          status: 1,
          approve: 1,
          ids: this.data?.content?.products_ids?.join(','),
          paginate: this.data?.content?.products_ids?.length
        }));
      } else { getProducts$ = of(null); }

      // Get Category
      let getCategory$;
      let categoryIds = this.data?.content.category_product.category_ids.concat(this.data.content.categories_icon_list.category_ids);
      if (categoryIds) {
        getCategory$ = this.store.dispatch(new GetCategories({
          status: 1,
          ids: categoryIds?.join(',')
        }))
      } else { getCategory$ = of(null); }

      // Get Blog
      let getBlog$;
      if (this.data?.content?.featured_blogs?.blog_ids?.length && this.data?.content?.featured_blogs?.status) {
        getBlog$ = this.store.dispatch(new GetBlogs({
          status: 1,
          ids: this.data?.content?.featured_blogs?.blog_ids?.join(',')
        }));
      } else { getBlog$ = of(null); }

      // Skeleton Loader
      if (this.platformId) {
        document.body.classList.add('skeleton-body', 'digital-download');
        forkJoin([getProducts$, getCategory$, getBlog$]).subscribe({
          complete: () => {
            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        });
      }
    }
  }

  ngOnDestroy() {
    // Remove Class
    if (this.platformId) {
      document.body.classList.remove('digital-download');
    }
  }
}
