import { Params } from "../../interface/core.interface";

export class GetAttributes {
  static readonly type = "[Attribute] Get";
  constructor(public payload?: Params) {}
}

export class GetAttributeValues {
  static readonly type = "[Attribute] Value Get";
  constructor(public payload?: Params) {}
}

export class GetAttribute {
  static readonly type = "[Attribute] Edit";
  constructor(public id: number) {}
}
