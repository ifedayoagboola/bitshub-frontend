import { Component, inject, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '../../../../../shared/store/state/product.state';
import { Observable } from 'rxjs';
import { ProductModel } from '../../../../../shared/interface/product.interface';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../../../shared/components/widgets/pagination/pagination.component';
import { PaginationService } from '../../../../../shared/services/pagination.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-collection-paginate',
    imports: [CommonModule, TranslateModule, PaginationComponent],
    templateUrl: './collection-paginate.component.html',
    styleUrl: './collection-paginate.component.scss'
})
export class CollectionPaginateComponent {

  product$: Observable<ProductModel> = inject(Store).select(ProductState.product);

  @Input() filter: Params;

  public totalItems: number = 0;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public paginationService: PaginationService) {
    this.product$.subscribe(product => this.totalItems = product?.total);
  }

  setPaginate(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: page
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    });
  }

}
