import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { ThemeOptionState } from '../../../../shared/store/state/theme-option.state';
import { BannerComponent } from '../widgets/banner/banner.component';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';
import { SidebarComponent } from '../widgets/sidebar/sidebar.component';

@Component({
    selector: 'app-collection-right-sidebar',
    imports: [CommonModule, BannerComponent,
        SidebarComponent, CollectionProductsComponent],
    templateUrl: './collection-right-sidebar.component.html',
    styleUrl: './collection-right-sidebar.component.scss'
})
export class CollectionRightSidebarComponent {

  themeOptions$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  @Input() filter: Params;

  public bannerImageUrl: string;

  constructor(public attributeService: AttributeService) {
    this.themeOptions$.subscribe(res => this.bannerImageUrl = res?.collection?.collection_banner_image_url)
  }

}
