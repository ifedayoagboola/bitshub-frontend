import { Params } from "../../interface/core.interface";

export class Downloads {
  static readonly type = "[Download] Get";
  constructor(public payload?: Params) {}
}

export class DownloadFiles {
  static readonly type = "[Download] Files";
  constructor(public id: number) {}
}

export class DownloadLicense {
  static readonly type = "[Download] License";
  constructor(public id: number) {}
}