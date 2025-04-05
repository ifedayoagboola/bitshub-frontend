import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

import { Banners } from '../../../../shared/interface/theme.interface';
import { NoDataComponent } from '../../../../shared/components/widgets/no-data/no-data.component';
import { environment } from '../../../../../environments/environment';
import { AboutFutures } from '../../../../shared/interface/theme-option.interface';

@Component({
    selector: 'app-theme-services',
    imports: [CommonModule, NoDataComponent],
    templateUrl: './theme-services.component.html',
    styleUrl: './theme-services.component.scss'
})
export class ThemeServicesComponent {

  @Input() services?: Banners[] | AboutFutures[];
  @Input() class: string;
  @Input() type: string;

  public filteredServices: Banners[];
  public StorageURL = environment.storageURL;

  ngOnChanges(change: SimpleChanges){
    if(change['services'] && change['services'].currentValue){
      this.filteredServices = change['services'].currentValue.filter((service: Banners) => {
        return service.status;
      })
    }
  }
}
