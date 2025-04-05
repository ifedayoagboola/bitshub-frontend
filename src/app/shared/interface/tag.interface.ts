import { PaginateModel } from "./core.interface";

export interface TagModel extends PaginateModel {
  data: Tag[];
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  description?: string;
  type: string;
  status: boolean;
  created_by_id: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
