import { UpdatePasswordState, AuthForgotPasswordState, AuthUserState, AuthVerifyOTPState, RegisterModal, AuthNumberLoginState, AuthVerifyNumberOTPState } from "../../interface/auth.interface";

export class Register {
  static readonly type = "[Auth] Register";
  constructor(public payload: RegisterModal) {}
}

export class Login {
  static readonly type = "[Auth] Login";
  constructor(public payload: AuthUserState){}
}

export class LoginWithNumber {
  static readonly type = "[Auth] Login With Number";
  constructor(public payload: AuthNumberLoginState){}
}

export class ForgotPassword{
  static readonly type = "[Auth] ForgotPassword";
  constructor(public payload: AuthForgotPasswordState){}
}

export class VerifyOTP{
  static readonly type = "[Auth] VerifyOTP";
  constructor(public payload: AuthVerifyOTPState){}
}

export class VerifyNumberOTP{
  static readonly type = "[Auth] VerifyNumberOTP";
  constructor(public payload: AuthVerifyNumberOTPState){}
}

export class UpdatePassword{
  static readonly type = "[Auth] UpdatePassword";
  constructor(public payload: UpdatePasswordState){}
}

export class Logout{
  static readonly type = "[Auth] Logout";
}

export class AuthClear {
  static readonly type = "[Auth] clear";
}
