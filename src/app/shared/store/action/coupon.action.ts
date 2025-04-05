import { Params } from "../../interface/core.interface";

export class GetCoupons {
  static readonly type = "[Coupon] Get";
  constructor(public payload?: Params) {}
}
