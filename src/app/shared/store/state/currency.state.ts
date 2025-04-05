import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";
import { Currency } from "../../interface/currency.interface";
import { CurrencyService } from "../../services/currency.service";
import { GetCurrencies } from "../action/currency.action";

export class CurrencyStateModel {
  currency = {
    data: [] as Currency[],
    total: 0
  }
}

@State<CurrencyStateModel>({
  name: "currency",
  defaults: {
    currency: {
      data: [],
      total: 0
    },
  },
})
@Injectable()
export class CurrencyState {

  constructor(private currencyService: CurrencyService) {}

  @Selector()
  static currency(state: CurrencyStateModel) {
    return state.currency;
  }

  @Action(GetCurrencies)
  getCurrencies(ctx: StateContext<CurrencyStateModel>, action: GetCurrencies) {
    return this.currencyService.getCurrencies(action.payload).pipe(
      tap({
        next: result => {
          ctx.patchState({
            currency: {
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
