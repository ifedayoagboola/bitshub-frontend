import { Params } from "@angular/router";

export class GetMenu {
  static readonly type = "[Menu] Get";
  constructor(public payload?: Params) {}
}
