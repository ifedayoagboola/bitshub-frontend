import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Params } from '../interface/core.interface';
import { TagModel } from '../interface/tag.interface';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {}

  getTags(payload?: Params): Observable<TagModel> {
    return this.http.get<TagModel>(`${environment.URL}/tag.json`, { params: payload });
  }
}
