import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  constructor(private http: HttpClient) { }

  POST(payload: any): Observable<any>{
    return this.http.post(`${environment.URL}/login`,payload)
  }
}
