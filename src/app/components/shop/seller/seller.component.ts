import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BreadcrumbComponent } from '../../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { Option } from '../../../shared/interface/theme-option.interface';
import { Select, Store } from '@ngxs/store';
import { ThemeOptionState } from '../../../shared/store/state/theme-option.state';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'app-seller',
    imports: [CommonModule, TranslateModule, BreadcrumbComponent],
    templateUrl: './seller.component.html',
    styleUrl: './seller.component.scss'
})
export class SellerComponent {

  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  public breadcrumb: breadcrumb = {
    title: "become a vendor",
    items: [{ label: 'become a vendor', active: true }]
  }

  public data?: Option;
  public StorageURL = environment.storageURL;

  constructor(){
    this.themeOption$.subscribe(data => this.data = data);
  }

}
