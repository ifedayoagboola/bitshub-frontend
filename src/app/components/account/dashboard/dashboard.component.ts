import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AccountState } from '../../../shared/store/state/account.state';
import { Observable } from 'rxjs';
import { User, UserAddress } from '../../../shared/interface/user.interface';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../shared/pipe/currency.pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProfileModalComponent } from '../../../shared/components/widgets/modal/edit-profile-modal/edit-profile-modal.component';
import { ChangePasswordModalComponent } from '../../../shared/components/widgets/modal/change-password-modal/change-password-modal.component';

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule, TranslateModule, CurrencySymbolPipe],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  user$: Observable<User> = inject(Store).select(AccountState.user) as Observable<User>;

  public address: UserAddress | null;

  constructor(private modal: NgbModal) {
    this.user$.subscribe(user => {
      this.address = user?.address?.length ? user?.address?.[0] : null;
    });
  }

  openModal(value: string){
    if(value == 'profile'){
      this.modal.open(EditProfileModalComponent, { centered: true, windowClass: 'theme-modal-2' })
    }else if(value == 'password'){
      this.modal.open(ChangePasswordModalComponent, { centered: true, windowClass: 'theme-modal-2' })
    }
  }

}
