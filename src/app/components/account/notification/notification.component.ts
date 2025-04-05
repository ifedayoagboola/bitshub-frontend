import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { NotificationState } from '../../../shared/store/state/notification.state';
import { Observable } from 'rxjs';
import { MarkAsReadNotification } from '../../../shared/store/action/notification.action';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from '../../../shared/components/widgets/no-data/no-data.component';
import { Notification } from '../../../shared/interface/notification.interface';

@Component({
    selector: 'app-notification',
    imports: [CommonModule, TranslateModule, NoDataComponent],
    templateUrl: './notification.component.html',
    styleUrl: './notification.component.scss'
})
export class NotificationComponent {

  notification$: Observable<Notification[]> = inject(Store).select(NotificationState.notification) as Observable<Notification[]>;

  public isBrowser: boolean;

  constructor(private store: Store, @Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnDestroy() {
    if(this.isBrowser) {
      this.store.dispatch(new MarkAsReadNotification());
    }
  }

}
