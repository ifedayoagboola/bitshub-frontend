import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { tap } from "rxjs";

import { Currency } from "../../interface/currency.interface";
import { Values } from "../../interface/setting.interface";
import { SettingService } from "../../services/setting.service";

import { GetSettingOption, SelectedCurrency } from "../action/setting.action";

export class SettingStateModel {
  setting: Values | null;
  selectedCurrency: Currency | null;
}

@State<SettingStateModel>({
  name: "setting",
  defaults: {
    setting: null,
    selectedCurrency: null
  }
})

@Injectable()
export class SettingState {

  constructor(private settingService: SettingService) {}

  @Selector()
  static setting(state: SettingStateModel) {
    return state.setting;
  }

  @Selector()
  static selectedCurrency(state: SettingStateModel) {
    return state.selectedCurrency;
  }

  @Action(GetSettingOption)
  getSettingOptions(ctx: StateContext<SettingStateModel>) {
    return this.settingService.getSettingOption().pipe(
      tap({
        next: (result) => {
          const state = ctx.getState();

          if(!state.selectedCurrency && result?.values?.general){
            state.selectedCurrency = result?.values?.general.default_currency;
          }

          ctx.patchState({
            ...state,
            setting: result.values,
          });
        },
        error: (err) => {
          throw new Error(err?.error?.message);
        },
      })
    );
  }

  @Action(SelectedCurrency)
  selectedCurrency(ctx: StateContext<SettingStateModel>, action: SelectedCurrency){
    const state = ctx.getState();
    ctx.patchState({
      ...state,
      selectedCurrency: action.payload
    });
  }

}
