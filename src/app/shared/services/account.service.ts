import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { AccountUser } from '../interface/account.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  public isOpenMenu: boolean = false;

  constructor(private http: HttpClient) {}

  getUserDetails(): Observable<any> {
    return this.http.get<AccountUser>(`${environment.URL}/self.json`);
  }
 
}
