import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { WishlistModel } from '../interface/wishlist.interface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  public skeletonLoader: boolean = false;
  
  constructor(private http: HttpClient) { }

  getWishlistItems(): Observable<WishlistModel> {
    return this.http.get<WishlistModel>(`${environment.URL}/wishlist.json`);
  }

}
