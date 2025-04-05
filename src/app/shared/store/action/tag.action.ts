import { Params } from "../../interface/core.interface";

export class GetTags {
  static readonly type = "[Tag] Get";
  constructor(public payload?: Params) {}
}
