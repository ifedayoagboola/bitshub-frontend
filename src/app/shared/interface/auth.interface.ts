export interface AuthUserState {
  email: string;
  password: string;
}

export interface AuthStateModal{
  email: string;
  token: String | Number;
  access_token: String | null;
  permissions: [];
}

export interface AuthForgotPasswordState{
  email: string;
}

export interface AuthNumberLoginState{
  phone: number;
  country_code: number;
}

export interface AuthVerifyOTPState{
  email: string;
  token: string;
}

export interface AuthVerifyNumberOTPState{
  phone: number;
  country_code: number;
  token: string;
}

export interface UpdatePasswordState{
  email: string;
  token: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterModal {
  name: string;
  email: string;
  phone: number;
  country_code: number;
  password: string;
  password_confirmation: string;
}
