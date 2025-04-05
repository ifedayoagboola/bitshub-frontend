import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import { Refund } from "../../interface/refund.interface";

import { RefundService } from "../../services/refund.service";

import { GetRefund, SendRefundRequest } from "../action/refund.action";

export class RefundStateModel {
  refund = {
    data: [] as Refund[],
    total: 0
  }
}

@State<RefundStateModel>({
  name: "refund",
  defaults: {
    refund: {
      data: [],
      total: 0
    },
  },
})

@Injectable()
export class RefundState {

  constructor(private refundService: RefundService) {}

  @Selector()
  static refund(state: RefundStateModel) {
    return state.refund;
  }

  @Action(GetRefund)
  getRefund(ctx: StateContext<RefundStateModel>, action: GetRefund) {
    return this.refundService.getRefunds(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            refund: {
              data: result.data,
              total: result?.total ? result?.total : result.data?.length
            }
          });
        },
        error: err => {
          throw new Error(err?.error?.message);
        }
      })
    );
  }


  @Action(SendRefundRequest)
  sendRefundStatus(ctx: StateContext<RefundStateModel>, action: SendRefundRequest) {
    // Send Request Logic Here

  }

}
