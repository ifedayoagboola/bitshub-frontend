import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartAddOrUpdate, CartModel } from '../interface/cart.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private subjectQty = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getCartItems(): Observable<CartModel> {
    return this.http.get<CartModel>(`${environment.URL}/cart.json`);
  }

  updateQty() {
    this.subjectQty.next(true);
  }

  getUpdateQtyClickEvent(): Observable<boolean>{
    return this.subjectQty.asObservable();
  }

}
