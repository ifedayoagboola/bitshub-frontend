import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AlertComponent } from '../../../shared/components/widgets/alert/alert.component';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';
import { breadcrumb } from '../../../shared/interface/breadcrumb.interface';
import { Cart, CartAddOrUpdate } from '../../../shared/interface/cart.interface';
import { Values } from '../../../shared/interface/setting.interface';
import { Option } from '../../../shared/interface/theme-option.interface';
import { AuthService } from '../../../shared/services/auth.service';
import { Login } from '../../../shared/store/action/auth.action';
import { GetCartItems, SyncCart } from '../../../shared/store/action/cart.action';
import { CartState } from '../../../shared/store/state/cart.state';
import { SettingState } from '../../../shared/store/state/setting.state';
import { ThemeOptionState } from '../../../shared/store/state/theme-option.state';

@Component({
    selector: 'app-login',
    imports: [CommonModule, RouterModule, FormsModule,
        ReactiveFormsModule, TranslateModule, AlertComponent,
        ButtonComponent],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

  cartItem$: Observable<Cart[]> = inject(Store).select(CartState.cartItems) as Observable<Cart[]>;
  setting$: Observable<Values> = inject(Store).select(SettingState.setting) as Observable<Values>;
  themeOption$: Observable<Option> = inject(Store).select(ThemeOptionState.themeOptions) as Observable<Option>;

  @Output() activeForm: EventEmitter<string> = new EventEmitter();


  public validate: boolean = false;
  public loginForm: FormGroup;

  public breadcrumb: breadcrumb = {
    title: "customer's login",
    items: [
      {
        label: "login",
        active: true
      }
    ]
  }

  constructor(
    private store: Store,
    private authService: AuthService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router){
      this.loginForm = this.formBuilder.group({
        email: new FormControl('john.customer@example.com', [Validators.required, Validators.email]),
        password: new FormControl('123456789', Validators.required),
      })
    }

  submit(){
    this.validate = true;
    if(this.loginForm.valid){
      this.store.dispatch(new Login(this.loginForm.value)).subscribe({
        complete: () => {
          this.modalService.dismissAll();
          // Sync Cart Storage when successfully Login
          let syncCartItems: CartAddOrUpdate[] = [];
          this.cartItem$.subscribe(items => {
            items.filter(item => {
              if(item) {
                const params: CartAddOrUpdate = {
                  id: null,
                  product: item?.product,
                  product_id: item?.product_id,
                  variation: item?.variation ? item.variation : null,
                  variation_id: item?.variation_id ? item.variation_id : null,
                  quantity: item.quantity
                }
                syncCartItems.push(params);
              }
            });
          });
          if(syncCartItems.length) {
            this.store.dispatch(new SyncCart(syncCartItems));
          } else {
            this.store.dispatch(new GetCartItems());
          }

          this.authService.redirectUrl = undefined;
        }
      })
    }
  }

  loginWithNumber(){
    this.activeForm.emit('withNumber');
  }

  action(action: string){
    this.activeForm.emit(action);
  }
}
