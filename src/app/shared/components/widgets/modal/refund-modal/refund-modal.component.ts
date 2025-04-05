import { Component, Input } from '@angular/core';
import { Product } from '../../../../interface/product.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select2Data, Select2Module } from 'ng-select2-component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { SendRefundRequest } from '../../../../store/action/refund.action';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CurrencySymbolPipe } from '../../../../pipe/currency.pipe';
import { ButtonComponent } from '../../button/button.component';

@Component({
    selector: 'app-refund-modal',
    imports: [CommonModule, TranslateModule, FormsModule,
        ReactiveFormsModule, Select2Module, CurrencySymbolPipe,
        ButtonComponent],
    templateUrl: './refund-modal.component.html',
    styleUrl: './refund-modal.component.scss'
})
export class RefundModalComponent {

  @Input() productDetails: Product;
  @Input() orderId: number;

  public product: Product;
  public form: FormGroup;

  public option: Select2Data = [
    {
      label: 'Wallet',
      value: 'wallet',
    },
    {
      label: 'Paypal',
      value: 'paypal',
    },
    {
      label: 'Bank',
      value: 'bank',
    }
  ]

  constructor(public modalService: NgbActiveModal, private store: Store ){
    this.form = new FormGroup({
      order_id: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required]),
      payment_type: new FormControl('', [Validators.required]),
      product_id: new FormControl()
    })
  }


  ngOnInit(){
    if(this.form){
      this.form.controls['order_id'].setValue(this.orderId);
      this.form.get('product_id')?.patchValue(this.productDetails.id);
    }
  }

  sendRequest(){
    this.form.markAllAsTouched();

    if(this.form.valid){
      this.store.dispatch(new SendRefundRequest(this.form.value)).subscribe({
        complete: () => {
          this.form.reset();
          this.modalService.close();
        }
      });
    }
  }
}
