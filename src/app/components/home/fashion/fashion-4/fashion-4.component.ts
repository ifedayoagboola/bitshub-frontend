import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngxs/store';
import { forkJoin, of } from 'rxjs';

import { ImageLinkComponent } from '../../../../shared/components/widgets/image-link/image-link.component';
import { ThemeHomeSliderComponent } from '../../widgets/theme-home-slider/theme-home-slider.component';
import { ThemeProductComponent } from '../../widgets/theme-product/theme-product.component';
import { ThemeTitleComponent } from '../../widgets/theme-title/theme-title.component';

import { ThemeOptionService } from '../../../../shared/services/theme-option.service';

import { Category } from '../../../../shared/interface/category.interface';
import { FashionFour, FeaturedBanner } from '../../../../shared/interface/theme.interface';

import { CategoriesComponent } from '../../../../shared/components/widgets/categories/categories.component';
import { productSlider4 } from '../../../../shared/data/owl-carousel';
import { GetBrands } from '../../../../shared/store/action/brand.action';
import { GetCategories } from '../../../../shared/store/action/category.action';
import { GetProductByIds } from '../../../../shared/store/action/product.action';
import { ThemeBrandComponent } from '../../widgets/theme-brand/theme-brand.component';


@Component({
    selector: 'app-fashion-4',
    imports: [CommonModule,
        ThemeHomeSliderComponent, ThemeTitleComponent,
        ThemeProductComponent, ImageLinkComponent,
        ThemeBrandComponent, CategoriesComponent],
    templateUrl: './fashion-4.component.html',
    styleUrl: './fashion-4.component.scss'
})
export class Fashion4Component {

  @Input() data?: FashionFour;
  @Input() slug: string;

  public categories: Category[];
  public banners: FeaturedBanner[];
  public productSlider4 =  productSlider4;
  private platformId: boolean;

  constructor(
    private store: Store,
    @Inject(PLATFORM_ID) platformId: Object,
    private themeOptionService: ThemeOptionService) {
      this.platformId = isPlatformBrowser(platformId);
  }
  
  ngOnChanges() {
      if(this.data?.slug == this.slug) {

        this.banners = [];
        if(this.data?.content?.offer_banner_1?.banner_1?.status){
          this.banners = [...this.banners, this.data?.content?.offer_banner_1?.banner_1]
        }
        if(this.data?.content?.offer_banner_1?.banner_2?.status){
          this.banners = [...this.banners, this.data?.content?.offer_banner_1?.banner_2]
        }
        if(this.data?.content?.offer_banner_1?.banner_3?.status){
          this.banners = [...this.banners, this.data?.content?.offer_banner_1?.banner_3]
        }

        let categoryIds = this.data?.content?.products_list?.categories?.category_ids;

        // Get Products
        let getProducts$;
        if(this.data?.content?.products_ids?.length && this.data?.content?.products_list?.products?.status ){
          getProducts$ = this.store.dispatch(new GetProductByIds({
            status: 1,
            approve: 1,
            ids: this.data?.content?.products_ids?.join(','),
            paginate: this.data?.content?.products_ids?.length
          }));
        } else { getProducts$ = of(null); }

        // Get Brand
        let getBrands$;
        if(this.data?.content?.brand?.status && this.data?.content?.brand?.brand_ids?.length){
          getBrands$ = this.store.dispatch(new GetBrands({
            status: 1,
            ids: this.data?.content?.brand?.brand_ids?.join(',')
          }));
        } else { getBrands$ = of(null); }

        // Get Category
        this.store.dispatch(new GetCategories({
          status: 1,
          ids: categoryIds?.join(',')
        }))
      
      if(this.platformId) {
        // Skeleton Loader
        document.body.classList.add('skeleton-body');
    
        // large container
        document.body.classList.add('large-container');

        forkJoin([getProducts$, getBrands$]).subscribe({
          complete: () => {
            document.body.classList.remove('skeleton-body');
            this.themeOptionService.preloader = false;
          }
        });
      }
    }

  }

  ngOnDestroy(){
    if(this.platformId) {
      document.body.classList.remove('large-container');
    }
  }
}
