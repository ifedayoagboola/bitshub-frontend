import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import { OrderStatus } from "../../interface/order-status.interface";

import { OrderStatusService } from "../../services/order-status.service";

import { GetOrderStatus } from "../action/order-status.action";

export class OrderStatusStateModel {
   orderStatus = {
    data: [] as OrderStatus[],
    total: 0
  }
  selectedOrderStatus: OrderStatus | null;
}

@State<OrderStatusStateModel>({
  name: "orderStatus",
  defaults: {
   orderStatus: {
      data: [],
      total: 0
    },
    selectedOrderStatus: null
  },
})

@Injectable()
export class OrderStatusState {

  constructor(private orderStatusService: OrderStatusService) {}

   @Selector()
   static orderStatus(state: OrderStatusStateModel) {
      return state.orderStatus;
   }

   @Selector()
   static orderStatuses(state: OrderStatusStateModel) {
      return state.orderStatus.data.map(res => {
         return { label: res?.name, value: res?.id }
       });
   }

   @Selector()
   static selectedOrderStatus(state: OrderStatusStateModel) {
      return state.selectedOrderStatus;
   }

   @Action(GetOrderStatus)
   getOrderStatus(ctx: StateContext<OrderStatusStateModel>, action: GetOrderStatus) {
     return this.orderStatusService.getOrderStatus(action.payload).pipe(
       tap({
         next: result => {
            ctx.patchState({
              orderStatus: {
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

}
