export class ThemeOptions{
  static readonly type = "[Theme Option] Get"
}

export class UpdateSession {
  static readonly type = "[Theme Option] Update Session";
  constructor(public slug: string, public value: boolean) {}
}

export class UpdateProductBox {
  static readonly type = "[Theme Option] Update Product Box";
  constructor(public value: string) {}
}
