import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { WalletState } from '../../../shared/store/state/wallet.state';
import { Observable } from 'rxjs';
import { Wallet } from '../../../shared/interface/wallet.interface';
import { Params } from '@angular/router';
import { GetUserTransaction } from '../../../shared/store/action/wallet.action';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency.pipe';
import { PaginationComponent } from '../../../shared/components/widgets/pagination/pagination.component';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';

@Component({
    selector: 'app-wallet',
    imports: [CommonModule, TranslateModule, CurrencySymbolPipe,
        PaginationComponent, NoDataComponent],
    templateUrl: './wallet.component.html',
    styleUrl: './wallet.component.scss'
})
export class WalletComponent {

  wallet$: Observable<Wallet> = inject(Store).select(WalletState.wallet) as Observable<Wallet>;

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
