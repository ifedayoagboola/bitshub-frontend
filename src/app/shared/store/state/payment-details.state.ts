import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import { PaymentDetails } from "../../interface/payment-details.interface";

import { NotificationService } from "../../services/notification.service";
import { PaymentDetailsService } from "../../services/payment-details.service";

import { GetPaymentDetails, UpdatePaymentDetails } from "../action/payment-details.action";

export class paymentDetailsStateModel {
  paymentDetails: PaymentDetails | null
}

@State<paymentDetailsStateModel>({
   name: "paymentDetails",
   defaults: {
    paymentDetails: null
   },
})

@Injectable()
export class PaymentDetailsState {

  constructor(private notificationService: NotificationService,
    private PaymentDetailsService: PaymentDetailsService) {}

  @Selector()
  static paymentDetails(state: paymentDetailsStateModel) {
    return state.paymentDetails;
  }

  @Action(GetPaymentDetails)
  getPaymentDetails(ctx: StateContext<paymentDetailsStateModel>) {
    return this.PaymentDetailsService.getPaymentAccount().pipe(
      tap({
        next: result => {
          ctx.patchState({
            paymentDetails: result
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }


  @Action(UpdatePaymentDetails)
  updatePaymentDetails(ctx: StateContext<paymentDetailsStateModel>, action: UpdatePaymentDetails) {
    // Update Payment Details Logic Here
  }
}
