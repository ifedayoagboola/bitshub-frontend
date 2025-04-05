import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Params } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { ThemeOptionState } from '../../../../shared/store/state/theme-option.state';
import { BannerComponent } from '../widgets/banner/banner.component';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';
import { SidebarComponent } from '../widgets/sidebar/sidebar.component';

@Component({
    selector: 'app-collection-product-infinite-scroll',
    imports: [CommonModule, BannerComponent, SidebarComponent,
        CollectionProductsComponent],
    templateUrl: './collection-product-infinite-scroll.component.html',
    styleUrl: './collection-product-infinite-scroll.component.scss'
})
export class CollectionProductInfiniteScrollComponent {

  themeOptions$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  @Input() filter: Params;

  public bannerImageUrl: string;

  constructor(public attributeService: AttributeService) {
    this.themeOptions$.subscribe(res => this.bannerImageUrl = res?.collection?.collection_banner_image_url)
  }

}
