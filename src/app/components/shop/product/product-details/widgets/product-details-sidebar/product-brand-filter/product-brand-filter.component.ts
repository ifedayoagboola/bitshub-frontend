import { Component, Input } from '@angular/core';
import { Brand } from '../../../../../../../shared/interface/brand.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-product-brand-filter',
    imports: [CommonModule, NgbModule],
    templateUrl: './product-brand-filter.component.html',
    styleUrl: './product-brand-filter.component.scss'
})
export class ProductBrandFilterComponent {

  @Input() brands: Brand[];

  constructor(
    private router: Router){}

    applyFilter(value: string | undefined) {
      this.router.navigate(['/collections'], {
      queryParams: {
          layout : "collection_left_sidebar",
          brand: value,
          page: 1
        },
        queryParamsHandling: 'merge', // preserve the existing query params in the route
        skipLocationChange: false  // do trigger navigation
      })
    }
}
