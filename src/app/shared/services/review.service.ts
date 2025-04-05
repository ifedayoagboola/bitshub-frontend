import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Review, ReviewModel } from '../interface/review.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) {}

  getReview(slug: Params): Observable<ReviewModel> {
    return this.http.get<ReviewModel>(`${environment.URL}/review.json`,  { params: slug });
  }
 
}
