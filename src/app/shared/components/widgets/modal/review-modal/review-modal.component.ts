import { Component, Input } from '@angular/core';
import { Product } from '../../../../interface/product.interface';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { SendReview, UpdateReview } from '../../../../store/action/review.action';
import { ButtonComponent } from '../../button/button.component';

@Component({
    selector: 'app-review-modal',
    imports: [CommonModule, TranslateModule, NgbModule,
        FormsModule, ReactiveFormsModule, ButtonComponent],
    templateUrl: './review-modal.component.html',
    styleUrl: './review-modal.component.scss'
})
export class ReviewModalComponent {

  @Input() product: Product;
  @Input() type: string;

  public currentRate: number = 0;
  public review = new FormControl('', [Validators.required])
  public form: FormGroup;

  constructor( public modal: NgbActiveModal, private store: Store ){
    this.form = new FormGroup({
      rating: new FormControl('', [Validators.required]),
      description: new FormControl('')
    })
  }

  ngOnInit(){
    if(this.type == 'edit'){
      this.form.patchValue({rating: this.product.user_review.rating, description: this.product.user_review.description})
    }
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      let data = {
        product_id: this.product.id,
        rating: this.form.get('rating')?.value,
        review_image_id: '',
        description: this.form.get('description')?.value
      }
      let action = new SendReview(data);

      if(this.type === 'edit' && this.product.user_review.id){
        action = new UpdateReview(this.product.user_review.id, data)
      }
      this.store.dispatch(action);
    }
  }
}
