import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../interface/core.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { MenuModel } from '../interface/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  public skeletonLoader: boolean = false;
  public mainMenuToggle: boolean = false;
  public sideNavToggle: boolean = false;
  public isOpenSearch: boolean = false;

  constructor(private http: HttpClient) {}

  getMenu(payload?: Params): Observable<MenuModel> {
    return this.http.get<MenuModel>(`${environment.URL}/menu.json`, { params: payload });
  }
}
