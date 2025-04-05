import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Point } from '../interface/point.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PointService {

  constructor(private http: HttpClient) {}

  getUserTransaction(payload?: Params): Observable<Point> {
    return this.http.get<Point>(`${environment.URL}/points.json`, { params: payload });
  }
}
