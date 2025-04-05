import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { RefundState } from '../../../shared/store/state/refund.state';
import { Observable } from 'rxjs';
import { RefundModel } from '../../../shared/interface/refund.interface';
import { Params } from '@angular/router';
import { GetRefund } from '../../../shared/store/action/refund.action';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationComponent } from '../../../shared/components/widgets/pagination/pagination.component';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';

@Component({
    selector: 'app-refund',
    imports: [CommonModule, TranslateModule, PaginationComponent,
        NoDataComponent],
    templateUrl: './refund.component.html',
    styleUrl: './refund.component.scss'
})
export class RefundComponent {

  refund$: Observable<RefundModel> = inject(Store).select(RefundState.refund) as Observable<RefundModel>;

  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 10, // Display per page,
  };

  constructor(private store: Store) {
    this.store.dispatch(new GetRefund(this.filter));
  }

  setPaginate(page: number) {
    this.filter['page'] = page;
    this.store.dispatch(new GetRefund(this.filter));
  }
}
