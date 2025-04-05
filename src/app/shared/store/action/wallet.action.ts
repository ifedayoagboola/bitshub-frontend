import { Params } from "../../interface/core.interface";

export class GetUserTransaction {
  static readonly type = "[Point] Transaction Get";
  constructor(public payload?: Params) {}
}