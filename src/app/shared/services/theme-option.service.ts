import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ThemeOptionService {

  public preloader: boolean = true;
  public theme_color: string;
  public theme_color_2: string;
  public theme_color_class: string;
  public footer_height: number;
  public newsletterModal: boolean = false;
  public productBox: string;

  constructor(private http: HttpClient) { }

  getThemeOption(): Observable<any>{
    return this.http.get<any>(`${environment.URL}/themeOptions.json`)
  }
}
