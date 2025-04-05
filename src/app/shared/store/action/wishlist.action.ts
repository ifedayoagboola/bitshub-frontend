import { Params } from "../../interface/core.interface";

export class GetWishlist {
  static readonly type = "[Wishlist] Get";
}

export class AddToWishlist {
  static readonly type = "[Wishlist] post";
  constructor(public payload: Params) {}
}

export class DeleteWishlist {
  static readonly type = "[Wishlist] delete";
  constructor(public id: number) {}
}
