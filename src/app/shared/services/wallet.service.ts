import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Wallet } from '../interface/wallet.interface';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(private http: HttpClient) {}

  getUserTransaction(payload?: Params): Observable<Wallet> {
    return this.http.get<Wallet>(`${environment.URL}/wallet.json`, { params: payload });
  }
}
