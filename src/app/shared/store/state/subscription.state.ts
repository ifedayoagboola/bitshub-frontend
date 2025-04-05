import { Injectable } from "@angular/core";
import { Action, StateContext } from "@ngxs/store";


import { Subscription } from "../action/subscription.action";

@Injectable()
export class SubscriptionState {

  constructor() {}

  @Action(Subscription)
  create(ctx: StateContext<any>, action: Subscription) {
    // subscription Logic Here

  }

}
