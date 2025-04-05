import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PaymentDetails } from '../../../shared/interface/payment-details.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PaymentDetailsState } from '../../../shared/store/state/payment-details.state';
import { GetPaymentDetails, UpdatePaymentDetails } from '../../../shared/store/action/payment-details.action';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../../shared/components/widgets/button/button.component';

@Component({
    selector: 'app-bank-details',
    imports: [CommonModule, TranslateModule, FormsModule,
        ReactiveFormsModule, ButtonComponent],
    templateUrl: './bank-details.component.html',
    styleUrl: './bank-details.component.scss'
})
export class BankDetailsComponent {

  paymentDetails$: Observable<PaymentDetails> = inject(Store).select(PaymentDetailsState.paymentDetails) as Observable<PaymentDetails>;

  public form: FormGroup;
  public active = 'bank';

  constructor(private store: Store) {
    this.form = new FormGroup({
      bank_account_no: new FormControl(),
      bank_name: new FormControl(),
      bank_holder_name: new FormControl(),
      swift: new FormControl(),
      ifsc: new FormControl(),
      paypal_email: new FormControl('', [Validators.email]),
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new GetPaymentDetails());
    this.paymentDetails$.subscribe(paymentDetails => {
      this.form.patchValue({
        bank_account_no: paymentDetails?.bank_account_no,
        bank_name: paymentDetails?.bank_name,
        bank_holder_name: paymentDetails?.bank_holder_name,
        swift:paymentDetails?.swift,
        ifsc: paymentDetails?.ifsc,
        paypal_email: paymentDetails?.paypal_email
      })
    });
  }

  submit(){
    this.form.markAllAsTouched();
    if(this.form.valid){
      this.store.dispatch(new UpdatePaymentDetails(this.form.value))
    }
  }
}
