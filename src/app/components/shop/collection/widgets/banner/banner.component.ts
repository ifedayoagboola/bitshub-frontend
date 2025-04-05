import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../../../environments/environment';

@Component({
    selector: 'app-collection-category-banner',
    imports: [TranslateModule],
    templateUrl: './banner.component.html',
    styleUrl: './banner.component.scss'
})
export class BannerComponent {

  @Input() class?: string = 'banner-contain-2 hover-effect';
  @Input() imageUrl?: string;

  public StorageURL = environment.storageURL;

}
