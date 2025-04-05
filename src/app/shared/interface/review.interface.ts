import { Attachment } from "./attachment.interface"
import { PaginateModel } from "./core.interface";
import { Product } from "./product.interface"
import { Stores } from "./store.interface"
import { User } from "./user.interface";

export interface ReviewModel extends PaginateModel {
  data: Review[];
}
export interface Review {
  id: number;
  consumer: User;
  consumer_id: number;
  consumer_name: string;
  description: string;
  product: Product;
  product_id: number;
  product_name: string;
  rating: number;
  review_image: Attachment;
  review_image_id: number;
  product_review_image: Attachment;
  store: Stores;
  store_id: number;
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
}
