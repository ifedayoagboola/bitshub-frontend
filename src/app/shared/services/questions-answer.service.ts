import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../interface/core.interface';
import { Observable } from 'rxjs';
import { QnAModel, QuestionAnswers } from '../interface/questions-answers.interface';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class QuestionsAnswerService {

  public skeletonLoader: boolean = false;

  constructor(private http: HttpClient) {}

  getQuestionAnswers(slug: Params): Observable<QnAModel> {
    return this.http.get<QnAModel>(`${environment.URL}/question-and-answer.json`,  { params: slug });
  }
}
