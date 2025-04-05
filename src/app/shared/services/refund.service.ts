import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Refund, RefundModel } from '../interface/refund.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RefundService {

  constructor(private http: HttpClient) {}

  getRefunds(payload?: Params): Observable<RefundModel> {
    return this.http.get<RefundModel>(`${environment.URL}/refund.json`, { params: payload });
  }
}
