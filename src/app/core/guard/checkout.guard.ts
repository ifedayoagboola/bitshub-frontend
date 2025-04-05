import { Injectable, ViewChild, } from '@angular/core';
import { Store } from '@ngxs/store';
import { UrlTree, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GetUserDetails } from './../../shared/store/action/account.action';
import { AuthService } from './../../shared/services/auth.service';
import { LoginModalComponent } from '../../shared/components/widgets/modal/login-modal/login-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard {

  @ViewChild("loginModal") LoginModal: LoginModalComponent;

  constructor(private store: Store,
    private router: Router,
    private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Store the attempted URL for redirecting after login
    this.authService.redirectUrl = state.url;

    if(this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {

        this.store.dispatch(new GetUserDetails()).subscribe({
            complete: () => {
                return true;
            }
        });

    } else {

      // .setting.activation.guest_checkout
        if(this.store.selectSnapshot(state => state.setting)) {

            // Redirect to the login page
            if(this.store.selectSnapshot(state => state.cart.is_digital_only)) {
                this.LoginModal.openModal()
                return true;
                
            }

        } else {

          this.LoginModal.openModal()
          return true

        }

    }

    return true;
  }

}
