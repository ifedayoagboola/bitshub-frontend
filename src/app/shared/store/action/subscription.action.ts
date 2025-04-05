export class Subscription {
  static readonly type = "[Subscription] Post";
  constructor(public payload: { email: string }) {}
}
