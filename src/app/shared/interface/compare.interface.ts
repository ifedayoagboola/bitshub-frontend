import { PaginateModel } from "./core.interface";
import { Product } from "./product.interface";

export interface CompareModel extends PaginateModel {
  data: Product[];
}
