import { PaginateModel } from "./core.interface";
import { Product } from "./product.interface";

export interface WishlistModel extends PaginateModel {
  data: Product[];
}
