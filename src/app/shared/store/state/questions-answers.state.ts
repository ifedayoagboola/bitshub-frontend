import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import { QuestionAnswers } from "../../interface/questions-answers.interface";

import { QuestionsAnswerService } from "../../services/questions-answer.service";

import { GetQuestionAnswers, SendQuestion, UpdateQuestionAnswers, Feedback } from "../action/questions-answers.action";

export class QuestionStateModel {
  question = {
    data: [] as QuestionAnswers[],
    total: 0
  }
}

@State<QuestionStateModel>({
  name: "question",
  defaults: {
    question: {
      data: [],
      total: 0
    },
  },
})
@Injectable()
export class QuestionAnswersState {

  constructor(private questionsAnswersService: QuestionsAnswerService ) {}

  @Selector()
  static questionsAnswers(state: QuestionStateModel) {
    return state.question;
  }

  @Action(GetQuestionAnswers)
  getQuestionAnswers(ctx: StateContext<QuestionStateModel>, action: GetQuestionAnswers) {
    this.questionsAnswersService.skeletonLoader = true;
    return this.questionsAnswersService.getQuestionAnswers(action.slug).pipe(
      tap({
        next: results => {
          const result = results.data.filter(qna => qna.product_id == action.slug['product_id']);
          ctx.patchState({
            question: {
              data: result,
              total: result?.length
            }
          });
        },
        complete:() => {
          this.questionsAnswersService.skeletonLoader = false;
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }

  @Action(SendQuestion)
  sendQuestion(ctx: StateContext<QuestionStateModel>, action: SendQuestion) {
    // Submit Question Logic Here
  }

  @Action(UpdateQuestionAnswers)
  update(ctx: StateContext<QuestionStateModel>, { payload, id }: UpdateQuestionAnswers) {
    // Update Question Logic Here
  }
  
  @Action(Feedback)
  Feedback(ctx: StateContext<QuestionStateModel>, action: Feedback) {
    // Feedback Logic Here
  }
}
