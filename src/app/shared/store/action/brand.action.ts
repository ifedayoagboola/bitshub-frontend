import { Params } from "../../interface/core.interface";

export class GetBrands {
  static readonly type = "[Brand] Get";
  constructor(public payload?: Params) {}
}

export class GetBrandBySlug {
  static readonly type = "[Brand] Get Brand By Slug";
  constructor(public slug: string) {}
}