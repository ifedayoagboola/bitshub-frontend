import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import { TransactionsData } from "../../interface/point.interface";

import { PointService } from "../../services/point.service";
import { GetUserTransaction } from "../action/point.action";

 
export class PointStateModel {
  point = {
    balance: 0 as number,
    transactions: {
      data: [] as TransactionsData[],
      total: 0
    }
  }
}

@State<PointStateModel>({
  name: "point",
  defaults: {
    point: {
      balance: 0 as number,
      transactions: {
        data: [],
        total: 0
      }
    }
  },
})
@Injectable()
export class PointState {

  constructor(private pointService: PointService) {}

  @Selector()
  static point(state: PointStateModel) {
    return state.point;
  }

  @Action(GetUserTransaction)
  getUserTransaction(ctx: StateContext<PointStateModel>, { payload }: GetUserTransaction) {
    return this.pointService.getUserTransaction(payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            point: {
              balance: result?.balance,
              transactions: {
                data: result?.transactions?.data,
                total: result?.transactions?.total ? result?.transactions?.total : result?.transactions?.data?.length
              }
            }
          });
        },
        error: err => {
          ctx.patchState({
            point: {
              balance: 0,
              transactions: {
                data: [],
                total: 0
              }
            }
          });
          throw new Error(err?.error?.message);
        }
      })
    );
  }

}
