import { PaginateModel } from "./core.interface";

export interface QnAModel extends PaginateModel {
    data: QuestionAnswers[];
}
export interface QuestionAnswers {
    id:  number;
    answer: string;
    product_id:  number;
    product: Product;
    store: Store;
    reaction: string | null;
    question: string;
    total_dislikes: number;
    total_likes: number;
    consumer_id: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface Product {
  id:  number;
  name: string;
}

export interface Store {
  id:  number;
  name: string;
}
