import { Params } from "../../interface/core.interface";
import { ContactUsModel } from "../../interface/page.interface";

export class GetPages {
  static readonly type = "[Page] Get";
  constructor(public payload?: Params) {}
}

export class GetPageBySlug {
  static readonly type = "[Page] By Slug";
  constructor(public slug: string) {}
}

export class GetFaqs {
  static readonly type = "[Faq] Get";
}

export class ContactUs {
  static readonly type = "[ContactUs] Post";
  constructor(public payload: ContactUsModel) {}
}
