import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Params } from '../../../../shared/interface/core.interface';
import { Option } from '../../../../shared/interface/theme-option.interface';
import { AttributeService } from '../../../../shared/services/attribute.service';
import { ThemeOptionState } from '../../../../shared/store/state/theme-option.state';
import { BannerComponent } from '../widgets/banner/banner.component';
import { CollectionProductsComponent } from '../widgets/collection-products/collection-products.component';
import { SidebarComponent } from '../widgets/sidebar/sidebar.component';

@Component({
    selector: 'app-collection-left-sidebar',
    imports: [CommonModule, BannerComponent,
        SidebarComponent, CollectionProductsComponent],
    templateUrl: './collection-left-sidebar.component.html',
    styleUrl: './collection-left-sidebar.component.scss'
})
export class CollectionLeftSidebarComponent {

  themeOptions$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  @Input() filter: Params;

  public bannerImageUrl: string;

  constructor(public attributeService: AttributeService) {
    this.themeOptions$.subscribe(res => this.bannerImageUrl = res?.collection?.collection_banner_image_url)
  }
}
