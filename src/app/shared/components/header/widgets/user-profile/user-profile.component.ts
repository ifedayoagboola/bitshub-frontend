import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AccountUser } from '../../../../interface/account.interface';
import { AuthService } from '../../../../services/auth.service';
import { AccountState } from '../../../../store/state/account.state';
import { AuthState } from '../../../../store/state/auth.state';
import { ConfirmationModalComponent } from '../../../widgets/modal/confirmation-modal/confirmation-modal.component';
import { LoginModalComponent } from '../../../widgets/modal/login-modal/login-modal.component';

@Component({
    selector: 'app-user-profile',
    imports: [CommonModule, RouterModule, TranslateModule, LoginModalComponent],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {

  public isLogin: boolean;

  @ViewChild("loginModal") LoginModal: LoginModalComponent;

  user$: Observable<AccountUser> = inject(Store).select(AccountState.user) as Observable<AccountUser>;
  isAuthenticated$: Observable<Boolean> = inject(Store).select(AuthState.isAuthenticated);

  constructor(private authService: AuthService, private modal: NgbModal,
    public route: Router, private store: Store) {
  }

  ngOnInit(){
    this.isAuthenticated$.subscribe(res => {
      this.isLogin = Boolean(res)
    })
  }

  account(){
    this.authService.redirectUrl = '/account/dashboard';
    if(this.isLogin){
      this.route.navigate(['/account/dashboard'])
    } else {
      this.authService.isLogin = true;
    }
  }


  logout() {
     alert(this.authService.isLogin)
    if(!this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {
      this.authService.isLogin = true;
    } else {
      this.modal.open(ConfirmationModalComponent, { centered: true });
    }

  }
}
