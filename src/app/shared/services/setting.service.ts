import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Setting } from '../interface/setting.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http: HttpClient) {}

  getSettingOption(): Observable<Setting> {
    return this.http.get<Setting>(`${environment.URL}/settings.json`);
  }

}
