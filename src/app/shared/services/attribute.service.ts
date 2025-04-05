import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Attribute, AttributeModel, AttributeValueModel } from '../interface/attribute.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  public skeletonLoader: boolean = false;
  public offCanvasMenu: boolean = false;

  constructor(private http: HttpClient) {}

  getAttributes(payload?: Params): Observable<AttributeModel> {
    return this.http.get<AttributeModel>(`${environment.URL}/attribute.json`, { params: payload });
  }

  getAttributeValues(payload?: Params): Observable<AttributeValueModel> {
    return this.http.get<AttributeValueModel>(`${environment.URL}/attribute-value.json`, { params: payload });
  }

  getAttribute(id: number): Observable<Attribute> {
    return this.http.get<Attribute>(`${environment.URL}/attribute/${id}`);
  }
}
