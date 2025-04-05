import { Component, inject, Input } from '@angular/core';
import { Order } from '../../../../interface/order.interface';
import { Select, Store } from '@ngxs/store';
import { SettingState } from '../../../../store/state/setting.state';
import { Observable } from 'rxjs';
import { Values } from '../../../../interface/setting.interface';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RePayment } from '../../../../store/action/order.action';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonComponent } from '../../button/button.component';

@Component({
    selector: 'app-pay-modal',
    imports: [CommonModule, TranslateModule, FormsModule,
        ReactiveFormsModule, ButtonComponent],
    templateUrl: './pay-modal.component.html',
    styleUrl: './pay-modal.component.scss'
})
export class PayModalComponent {

  @Input() orderDetails: Order;

  setting$: Observable<Values> = inject(Store).select(SettingState.setting) as Observable<Values>;

  public order: Order;
  public paymentType = new FormControl('', [Validators.required]);

  constructor( public modalService: NgbActiveModal, private store: Store){}

  submit() {
    this.paymentType.markAllAsTouched();
    if(this.paymentType.valid){
      const data = {
        order_number: this.order.order_number,
        payment_method: this.paymentType.value!
      }
      this.store.dispatch(new RePayment(data)).subscribe({
        complete: () => {
          this.modalService.close();
        }
      });
    }
  }

}
