import { Currency } from "../../interface/currency.interface";

export class GetSettingOption {
   static readonly type = "[Setting] Get";
}

export class SelectedCurrency {
  static readonly type = "[Setting] SetCurrency";
  constructor(public payload: Currency) {}
}
