import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Params } from "../interface/core.interface";
import { ContactUsModel, FaqModel, Page, PageModel } from "../interface/page.interface";
import { StoresModel } from "../interface/store.interface";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class PageService {

  public skeletonLoader: boolean = false;
  
  constructor(private http: HttpClient) {}

  getPages(payload?: Params): Observable<PageModel> {
    return this.http.get<PageModel>(`${environment.URL}/page.json`, { params: payload });
  }

  getFaqs(): Observable<FaqModel> {
    return this.http.get<FaqModel>(`${environment.URL}/faq.json`);
  }

  getStores(payload?: Params): Observable<StoresModel> {
    return this.http.get<StoresModel>(`${environment.URL}/store`, { params: payload });
  }
  
}
