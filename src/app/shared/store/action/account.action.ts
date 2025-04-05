import { AccountUser, AccountUserUpdatePassword } from "../../interface/account.interface";
import { UserAddress } from "../../interface/user.interface";

export class GetUserDetails {
  static readonly type = "[Account] User Get";
  constructor() {}
}

export class UpdateUserProfile {
  static readonly type = "[Account] User Update";
  constructor(public payload: any) {}
}

export class UpdateUserPassword {
  static readonly type = "[Account] User Update Password";
  constructor(public payload: AccountUserUpdatePassword) {}
}

export class CreateAddress {
  static readonly type = "[Account] Address Create";
  constructor(public payload: UserAddress) {}
}

export class UpdateAddress {
  static readonly type = "[Account] Address Edit";
  constructor(public payload: UserAddress, public id: number) {}
}

export class DeleteAddress {
  static readonly type = "[Account] Address Delete";
  constructor(public id: number) {}
}

export class AccountClear {
  static readonly type = "[Account] Clear";
  constructor() {}
}
