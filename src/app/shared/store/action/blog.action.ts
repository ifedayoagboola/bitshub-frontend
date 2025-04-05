import { Params } from "../../interface/core.interface";

export class GetBlogs {
  static readonly type = "[Blog] Get";
  constructor(public payload?: Params) {}
}

export class GetBlogBySlug {
  static readonly type = "[Blog] By Slug";
  constructor(public slug: string) {}
}

export class GetRecentBlog {
  static readonly type = "[Blog] By Recent";
  constructor(public payload?: Params) {}
}

export class GetSelectedBlogs {
  static readonly type = "[Blog] Selected";
  constructor(public payload?: Params) {}
}
