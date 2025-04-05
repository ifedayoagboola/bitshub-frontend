import { Params } from "../../interface/core.interface";

export class GetCurrencies {
  static readonly type = "[Currency] Get";
  constructor(public payload?: Params) {}
}
