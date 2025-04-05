import { Component, Input, SimpleChanges } from '@angular/core';
import { Banners, Service } from '../../../../../../../shared/interface/theme.interface';
import { environment } from '../../../../../../../../environments/environment';

@Component({
    selector: 'app-product-sidebar-services',
    imports: [],
    templateUrl: './product-sidebar-services.component.html',
    styleUrl: './product-sidebar-services.component.scss'
})
export class ProductSidebarServicesComponent {

  @Input() services: Banners[] | undefined;

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
