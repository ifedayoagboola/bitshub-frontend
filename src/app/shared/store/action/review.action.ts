import { Params } from "../../interface/core.interface";

export class GetReview {
  static readonly type = "[Review] Get";
  constructor(public payload: Params) {}
}

export class SendReview {
  static readonly type = "[Review] Post";
  constructor(public payload: Params) {}
}

export class UpdateReview {
  static readonly type = "[Review] Put";
  constructor(public id: number, public payload: Params) {}
}
