import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../interface/core.interface';
import { Observable } from 'rxjs';
import { CurrencyModel } from '../interface/currency.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  public selectedCurrency: any;

  constructor(private http: HttpClient) {}

  getCurrencies(payload?: Params): Observable<CurrencyModel> {
    return this.http.get<CurrencyModel>(`${environment.URL}/currency.json`, { params: payload });
  }
}
