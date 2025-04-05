import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { UpdatePasswordState, AuthForgotPasswordState, AuthStateModal, AuthUserState, AuthVerifyOTPState, RegisterModal, AuthNumberLoginState, AuthVerifyNumberOTPState } from '../interface/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public redirectUrl: string | undefined;
  public confirmed: boolean = false;
  public isLogin: boolean = false;

  constructor(private http: HttpClient) { }

  // Auth logic here
}
