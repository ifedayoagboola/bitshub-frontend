import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { tap } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { NotificationService } from "../../services/notification.service";
import { AccountClear, GetUserDetails } from "../action/account.action";
import { AuthClear, ForgotPassword, Login, LoginWithNumber, Logout, Register, UpdatePassword, VerifyNumberOTP, VerifyOTP } from "../action/auth.action";
import { ClearCart } from "../action/cart.action";
import { AuthNumberLoginState } from "../../interface/auth.interface";

export interface AuthStateModel {
  email: String;
  number: AuthNumberLoginState | null;
  token: String | Number;
  access_token: String | null;
  permissions: [];
}

@State<AuthStateModel>({
  name: "auth",
  defaults: {
    email: '',
    token: '',
    number: null,
    access_token: '',
    permissions: [],
  },
})
@Injectable()
export class AuthState {

  constructor(private store: Store, public router: Router,
    private authService: AuthService) {}

  //   ngxsOnInit(ctx: StateContext<AuthStateModel>) {
  //   // Pre Fake Login (if you are using ap
  //   ctx.patchState({
  //     email: 'john.customer@example.com',
  //     token: '',
  //     access_token: '115|laravel_sanctum_mp1jyyMyKeE4qVsD1bKrnSycnmInkFXXIrxKv49w49d2a2c5'
  //   })
  // }

  @Selector()
  static accessToken(state: AuthStateModel): String | null {
    return state.access_token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): Boolean {
    return !!state.access_token;
  }

  @Selector()
  static email(state: AuthStateModel): String {
    return state.email;
  }

  @Selector()
  static number(state: AuthStateModel): AuthNumberLoginState | null {
    return state.number;
  }

  @Selector()
  static token(state: AuthStateModel): String | Number {
    return state.token;
  }

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register) {
    // Register Logic Here
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    // Login Logic Here
    ctx.patchState({
      email: 'john.customer@example.com',
      token: '',
      access_token: '115|laravel_sanctum_mp1jyyMyKeE4qVsD1bKrnSycnmInkFXXIrxKv49w49d2a2c5'
    })
    this.store.dispatch(new GetUserDetails());
  }

  @Action(LoginWithNumber)
  loginWithNumber(ctx: StateContext<AuthStateModel>, action: LoginWithNumber) {
    // Login Logic Here
    this.store.dispatch(new GetUserDetails());
  }

  @Action(ForgotPassword)
  forgotPassword(ctx: StateContext<AuthStateModel>, action: ForgotPassword) {
    // Forgot Password Logic Here
  }

  @Action(VerifyOTP)
  verifyEmail(ctx: StateContext<AuthStateModel>, action: VerifyOTP) {
    // Verify Logic Here
  }

  @Action(VerifyNumberOTP)
  verifyNumber(ctx: StateContext<AuthStateModel>, action: VerifyNumberOTP) {
    // Verify Logic Here
    this.store.dispatch(new GetUserDetails());
  }


  @Action(UpdatePassword)
  updatePassword(ctx: StateContext<AuthStateModel>, action: UpdatePassword) {
    // Update Password Logic Here
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    // Logout LOgic Here
    this.store.dispatch(new AuthClear());
    this.router.navigate(['/']);
  }

  @Action(AuthClear)
  authClear(ctx: StateContext<AuthStateModel>){
    ctx.patchState({
      email: '',
      token: '',
      access_token: null,
      permissions: [],
    });
    this.authService.redirectUrl = undefined;
    this.store.dispatch(new AccountClear());
    this.store.dispatch(new ClearCart());
  }
}
