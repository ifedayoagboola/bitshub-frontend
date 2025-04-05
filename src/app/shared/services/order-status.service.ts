import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderStatusModel } from '../interface/order-status.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  constructor(private http: HttpClient) {}

  getOrderStatus(payload?: Params): Observable<OrderStatusModel> {
    return this.http.get<OrderStatusModel>(`${environment.URL}/orderStatus.json`, { params: payload });
  }
}
