import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AccountState } from '../../../shared/store/state/account.state';
import { Observable } from 'rxjs';
import { User } from '../../../shared/interface/user.interface';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NotificationState } from '../../../shared/store/state/notification.state';
import { Logout } from '../../../shared/store/action/auth.action';
import { Notification } from '../../../shared/interface/notification.interface';
import { ConfirmationModalComponent } from '../../../shared/components/widgets/modal/confirmation-modal/confirmation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../../shared/services/account.service';
import { UpdateUserProfile } from '../../../shared/store/action/account.action';

@Component({
    selector: 'app-sidebar',
    imports: [CommonModule, RouterModule, TranslateModule],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  notification$: Observable<Notification[]> = inject(Store).select(NotificationState.notification) as Observable<Notification[]>;
  user$: Observable<User> = inject(Store).select(AccountState.user) as Observable<User>;

  public unreadNotificationCount: number;

  constructor(private store: Store, private modal: NgbModal,public accountService: AccountService) {
    this.notification$.subscribe((notification) => {
      this.unreadNotificationCount = notification?.filter(item => !item.read_at)?.length;
    });
  }

  logout() {
    const modal = this.modal.open(ConfirmationModalComponent, { centered: true, windowClass: '' });
    modal.componentInstance.confirm.subscribe((val: boolean) => {
      if(val === true) {
        this.store.dispatch(new Logout());
        this.modal.dismissAll();
      }
    })
  }

  closeMenu() {
    this.accountService.isOpenMenu = false;
  }

  uploadImage(event:any){
    if(event?.target?.files){
      let form = new FormData();
      form.append("profile_image", event.target.files[0]);
      form.append("_method", "PUT");
      this.store.dispatch(new UpdateUserProfile(form));
    } else {
      let form = new FormData();
      form.append("profile_image_id", '');
      form.append("_method", "PUT");
      this.store.dispatch(new UpdateUserProfile(form));
    }
  }
}
