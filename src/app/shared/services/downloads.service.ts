import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../interface/core.interface';
import { Observable } from 'rxjs';
import { DownloadModel } from '../interface/download.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DownloadsService {

  constructor(private http: HttpClient) {}

  downloads(payload?: Params): Observable<DownloadModel> {
    return this.http.get<DownloadModel>(`${environment.URL}/download.json`, { params: payload });
  }
}
