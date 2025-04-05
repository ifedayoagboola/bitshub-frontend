import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { AuthService } from '../../../../services/auth.service';
import { ToggleSidebarCart } from '../../../../store/action/cart.action';

@Component({
    selector: 'app-mobile-menu',
    imports: [RouterModule, TranslateModule],
    templateUrl: './mobile-menu.component.html',
    styleUrl: './mobile-menu.component.scss'
})
export class MobileMenuComponent {

  public active: string = '/';

  constructor(private store: Store, private authService: AuthService, private router: Router){}

  cartToggle(value: boolean) {
    this.store.dispatch(new ToggleSidebarCart(value));
  }

  activeMenu(menu: string){
    this.active = menu
  }

  reDirectWishlist(){
    if(!this.store.selectSnapshot(state => state.auth && state.auth.access_token)){
      this.authService.isLogin = true;
    }
    else {
      this.router.navigate(['/wishlist'])
      this.activeMenu('wishlist')
    }
  }
}
