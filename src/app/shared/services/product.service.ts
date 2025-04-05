import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../interface/core.interface';
import { Observable } from 'rxjs';
import { Product, ProductModel } from '../interface/product.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public skeletonLoader: boolean = false;
  public skeletonCategoryProductLoader: boolean = false;
  public productFilter: boolean = false;
  public searchSkeleton: boolean = false;

  constructor(private http: HttpClient) {}

  getProducts(payload?: Params): Observable<ProductModel> {
    return this.http.get<ProductModel>(`${environment.URL}/product.json`, { params: payload });
  }

  getProductBySlug(slug: string): Observable<Product> {
    return this.http.get<Product>(`${environment.URL}/product/slug/${slug}`);
  }

  getProductBySearchList(payload?: Params): Observable<any> {
    return this.http.get<any>(`${environment.URL}/product.json`, { params: payload });
  }

 
}
