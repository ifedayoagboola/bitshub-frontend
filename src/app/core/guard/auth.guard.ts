import { inject, Injectable, ViewChild } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

// import { LoginModalComponent } from '../../shared/components/widgets/modal/login-modal/login-modal.component';
import { AuthService } from '../../shared/services/auth.service';
import { GetUserDetails } from '../../shared/store/action/account.action';
import { AuthState } from 'src/app/shared/store/state/auth.state';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard{

  access_token$: Observable<String> = inject(Store).select(AuthState.accessToken) as Observable<String>;
  public is_redirect: boolean;

  // @ViewChild("loginModal") LoginModal: LoginModalComponent;

  constructor(private store: Store,
    private router: Router,
    private modal: NgbModal,
    private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // Store the attempted URL for redirecting after login
    this.authService.redirectUrl = state.url;

    // Redirect to the login page
   this.access_token$.subscribe((token) => {
      if(!token) {
        this.authService.isLogin = true;
        this.is_redirect = false
      } else {
        this.is_redirect = true
      }
    })

    this.store.dispatch(new GetUserDetails()).subscribe({
      complete: () => {
        return true;
      }
    });

    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    if (!!this.store.selectSnapshot(state => state.auth && state.auth.access_token)) {
      if(this.router.url.startsWith('/account') || this.router.url == '/checkout' || this.router.url == '/compare')
        this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
