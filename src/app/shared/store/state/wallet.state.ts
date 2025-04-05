import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import { TransactionsData } from "../../interface/wallet.interface";

import { WalletService } from "../../services/wallet.service";

import { GetUserTransaction } from "../action/wallet.action";

export class WalletStateModel {
  wallet = {
    balance: 0 as number,
    transactions: {
      data: [] as TransactionsData[],
      total: 0
    }
  }
}

@State<WalletStateModel>({
  name: "wallet",
  defaults: {
    wallet: {
      balance: 0 as number,
      transactions: {
        data: [],
        total: 0
      }
    }
  },
})

@Injectable()
export class WalletState {

  constructor(private walletService: WalletService) {}

  @Selector()
  static wallet(state: WalletStateModel) {
    return state.wallet;
  }

  @Action(GetUserTransaction)
  getUserTransactions(ctx: StateContext<WalletStateModel>, { payload }: GetUserTransaction) {
    return this.walletService.getUserTransaction(payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            wallet: {
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
            wallet: {
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
