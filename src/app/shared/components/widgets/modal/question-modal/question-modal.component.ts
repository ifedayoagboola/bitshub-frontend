import { Component, Input } from '@angular/core';
import { Product } from '../../../../interface/product.interface';
import { QuestionAnswers } from '../../../../interface/questions-answers.interface';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SendQuestion, UpdateQuestionAnswers } from '../../../../store/action/questions-answers.action';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { ButtonComponent } from '../../button/button.component';

@Component({
    selector: 'app-question-modal',
    imports: [CommonModule, TranslateModule, FormsModule,
        ReactiveFormsModule, CurrencySymbolPipe, ButtonComponent],
    templateUrl: './question-modal.component.html',
    styleUrl: './question-modal.component.scss'
})
export class QuestionModalComponent {

  @Input() product: Product;
  @Input() qna: QuestionAnswers;

  public question = new FormControl();
  public type = 'crate'
  public id: number;

  constructor(
    public store: Store,
    public modal: NgbActiveModal
    ){}

  ngOnInit(){
    if(this.qna){
      this.type = 'edit'
      this.id = this.qna.id;
      this.question.patchValue(this.qna.question);
    }
  }

  submit(){
    let data = {
      question: this.question.value,
      product_id: this.product.id,
      answer: ''
    }
    let action = new SendQuestion(data)
    if(data.question || data.product_id){
      if(this.type == 'edit' && this.id) {
        action = new UpdateQuestionAnswers(data, this.id)
      }
      this.store.dispatch(action).subscribe({
        complete:() => {
          this.modal.close();
        }
      })
    }
  }
}
