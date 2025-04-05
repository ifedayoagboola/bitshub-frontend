import { Params } from "../../interface/core.interface";

export class GetStores {
  static readonly type = "[Store] Get";
  constructor(public payload?: Params) {}
}

export class GetStoreBySlug {
  static readonly type = "[Store] Get By Slug";
  constructor(public slug: string) {}
}
