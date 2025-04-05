import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { States } from '../interface/state.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor(private http: HttpClient) {}

  getStates(): Observable<States[]> {
    return this.http.get<States[]>(`${environment.URL}/state.json`);
  }
}
