import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { CouponModel } from '../interface/coupon.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  public skeletonLoader: boolean = false;

  constructor(private http: HttpClient) {}

  getCoupons(payload?: Params): Observable<CouponModel> {
    return this.http.get<CouponModel>(`${environment.URL}/coupon.json`, { params: payload });
  }
}
