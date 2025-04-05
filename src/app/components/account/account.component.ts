import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BreadcrumbComponent } from '../../shared/components/widgets/breadcrumb/breadcrumb.component';
import { LoaderComponent } from '../../shared/components/widgets/loader/loader.component';
import { breadcrumb } from '../../shared/interface/breadcrumb.interface';
import { GetNotification } from '../../shared/store/action/notification.action';
import { LoaderState } from '../../shared/store/state/loader.state';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AccountService } from '../../shared/services/account.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-account',
    imports: [CommonModule, RouterModule, TranslateModule, BreadcrumbComponent,
        SidebarComponent, LoaderComponent],
    templateUrl: './account.component.html',
    styleUrl: './account.component.scss'
})
export class AccountComponent {

  public breadcrumb: breadcrumb = {
    title: "Dashboard",
    items: [{ label: 'Dashboard', active: false }]
  };

  loadingStatus$: Observable<boolean> = inject(Store).select(LoaderState.status) as Observable<boolean>;

  constructor(private store: Store, private router: Router, private accountService: AccountService) {
    this.store.dispatch(new GetNotification());
    this.router.events.subscribe(
      () => {
        this.breadcrumb.title = this.router?.url?.split('?')[0]?.split('/')?.pop()!;
        if(this.router?.url.includes('order/details')) {
          this.breadcrumb.title = 'Order';
        }
        this.breadcrumb.items = [];
        this.breadcrumb.items.push({ label: this.breadcrumb.title, active: false });
      }
    );
  }

  openMenu() {
    this.accountService.isOpenMenu = true;
  }

}
