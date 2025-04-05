import { Params } from "../../interface/core.interface";

export class GetProducts {
  static readonly type = "[Product] Get";
  constructor(public payload?: Params) {}
}

export class GetRelatedProducts {
  static readonly type = "[Product] Related Get";
  constructor(public payload?: Params) {}
}

export class GetCategoryProducts {
  static readonly type = "[Product] Category Get";
  constructor(public payload?: Params) {}
}

export class GetStoreProducts {
  static readonly type = "[Product] Store Get";
  constructor(public payload?: Params) {}
}

export class GetProductBySlug {
  static readonly type = "[Product] Get By Slug";
  constructor(public slug: string) {}
}

export class GetDealProducts {
  static readonly type = "[Product] Deal Get";
  constructor(public payload?: Params) {}
}

export class GetMenuProducts {
  static readonly type = "[Product] Menu Get";
  constructor(public payload?: Params) {}
}

export class GetProductBySearch {
  static readonly type = "[ProductBySearch] Get";
  constructor(public payload?: Params) {}
}

export class GetProductBySearchList {
  static readonly type = "[ProductBySearchList] Get";
  constructor(public payload?: Params) {}
}

export class GetProductByIds {
  static readonly type = "[ProductByIds] Get";
  constructor(public payload?: Params) {}
}

export class GetMoreProduct {
  static readonly type = "[MoreProduct] Get";
  constructor(public payload?: Params, public value?:boolean) {}

}
