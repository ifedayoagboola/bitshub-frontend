import { Params } from "../../interface/core.interface";

export class GetRefund {
  static readonly type = "[Refund] Get";
  constructor(public payload?: Params) {}
}

export class SendRefundRequest {
  static readonly type = "[Refund] Post";
  constructor(public payload?: Params) {}
}
