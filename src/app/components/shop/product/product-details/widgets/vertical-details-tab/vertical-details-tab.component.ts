import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { Product } from '../../../../../../shared/interface/product.interface';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Select, Store } from '@ngxs/store';
import { ProductReviewComponent } from '../product-review/product-review.component';
import { ReviewState } from '../../../../../../shared/store/state/review.state';
import { Observable } from 'rxjs';
import { ReviewModel } from '../../../../../../shared/interface/review.interface';
import { GetReview } from '../../../../../../shared/store/action/review.action';
import { QuestionsAnswersComponent } from '../questions-answers/questions-answers.component';
import { QuestionAnswersState } from '../../../../../../shared/store/state/questions-answers.state';
import { QnAModel } from '../../../../../../shared/interface/questions-answers.interface';
import { GetQuestionAnswers } from '../../../../../../shared/store/action/questions-answers.action';

@Component({
    selector: 'app-vertical-details-tab',
    imports: [CommonModule, NgbModule, TranslateModule,
        ProductReviewComponent, QuestionsAnswersComponent],
    templateUrl: './vertical-details-tab.component.html',
    styleUrl: './vertical-details-tab.component.scss'
})
export class VerticalDetailsTabComponent {

  question$: Observable<QnAModel> = inject(Store).select(QuestionAnswersState.questionsAnswers);
  review$: Observable<ReviewModel> = inject(Store).select(ReviewState.review);

  @Input() product: Product | null;

  public active = 'description';

  constructor(private store: Store, private sanitizer: DomSanitizer){}

  ngOnChanges(changes: SimpleChanges) {
    let product = changes['product']?.currentValue;
    this.store.dispatch(new GetReview({product_id: product.id}));
    this.store.dispatch(new GetQuestionAnswers({product_id: product.id}));
  }

  getTrustedHtml(data?:string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(data!);
  }
}
