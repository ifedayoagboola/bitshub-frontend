import { Component, inject, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Product } from '../../../../../../shared/interface/product.interface';
import { Select, Store } from '@ngxs/store';
import { QuestionsAnswerService } from '../../../../../../shared/services/questions-answer.service';
import { QuestionAnswers } from '../../../../../../shared/interface/questions-answers.interface';
import { AccountState } from '../../../../../../shared/store/state/account.state';
import { AccountUser } from '../../../../../../shared/interface/account.interface';
import { GetUserDetails } from '../../../../../../shared/store/action/account.action';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataComponent } from '../../../../../../shared/components/widgets/no-data/no-data.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionModalComponent } from '../../../../../../shared/components/widgets/modal/question-modal/question-modal.component';
import { Feedback } from '../../../../../../shared/store/action/questions-answers.action';

@Component({
    selector: 'app-questions-answers',
    imports: [CommonModule, TranslateModule, NoDataComponent],
    templateUrl: './questions-answers.component.html',
    styleUrl: './questions-answers.component.scss'
})
export class QuestionsAnswersComponent {

  // public user: AccountUser;
  public question = new FormControl();
  public isLogin: boolean = false;
  public skeletonItems = Array.from({ length: 5 }, (_, index) => index);
  private destroy$ = new Subject<void>();

  @Input() product: Product;
  @Input() questionAnswers: QuestionAnswers[];

  // @ViewChild("questionModal") QuestionModal: QuestionModalComponent;

  user$: Observable<AccountUser> = inject(Store).select(AccountState.user) as Observable<AccountUser>;

  constructor(private store: Store, public questionAnswersService: QuestionsAnswerService, private modal: NgbModal){
    this.isLogin = !!this.store.selectSnapshot(state => state.auth && state.auth.access_token)
    if(this.isLogin){
      this.store.dispatch(new GetUserDetails());
    }
  }

  openModal(product: Product, qna?: QuestionAnswers){
    if(qna){
      if(this.isLogin){
        const qnaModal = this.modal.open(QuestionModalComponent, { size: 'm', centered: true, windowClass: 'theme-modal-2' });
        qnaModal.componentInstance.product = product;
        qnaModal.componentInstance.qna = qna;
      }
    }else {
      const qnaModal = this.modal.open(QuestionModalComponent, { size: 'm', centered: true, windowClass: 'theme-modal-2 question-answer-modal' });
      qnaModal.componentInstance.product = product;
      qnaModal.componentInstance.qna = qna;
    }
  }

  feedback(qna: QuestionAnswers, value: string) {
    const data = {
      question_and_answer_id : qna.id,
      reaction: value
    }
    this.store.dispatch(new Feedback(data, value));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
