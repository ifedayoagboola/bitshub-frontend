import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { SettingState } from '../../../shared/store/state/setting.state';
import { Observable } from 'rxjs';
import { Values } from '../../../shared/interface/setting.interface';
import { Params } from '@angular/router';
import { PointState } from '../../../shared/store/state/point.state';
import { Point } from '../../../shared/interface/point.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency.pipe';
import { PaginationComponent } from '../../../shared/components/widgets/pagination/pagination.component';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { GetUserTransaction } from '../../../shared/store/action/point.action';

@Component({
    selector: 'app-point',
    imports: [CommonModule, TranslateModule, CurrencySymbolPipe,
        PaginationComponent, NoDataComponent],
    templateUrl: './point.component.html',
    styleUrl: './point.component.scss'
})
export class PointComponent {

  setting$: Observable<Values> = inject(Store).select(SettingState.setting) as Observable<Values>;
  point$: Observable<Point> = inject(Store).select(PointState.point) as Observable<Point>;

  public filter: Params = {
    'page': 1, // Current page number
    'paginate': 10, // Display per page,
  };

  constructor(private store: Store) {
    this.store.dispatch(new GetUserTransaction(this.filter));
  }

  setPaginate(page: number) {
    this.filter['page'] = page;
    this.store.dispatch(new GetUserTransaction(this.filter));
  }

}
