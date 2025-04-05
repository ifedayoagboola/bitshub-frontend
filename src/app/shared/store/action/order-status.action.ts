import { Params } from "../../interface/core.interface";

export class GetOrderStatus {
   static readonly type = "[Order Status] Get";
   constructor(public payload?: Params) {}
}
