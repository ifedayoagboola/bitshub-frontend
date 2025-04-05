import { PaginateModel } from "./core.interface";

export interface OrderStatusModel extends PaginateModel {
   data: OrderStatus[];
}

export interface OrderStatus {
   id: number;
   name: string;
   sequence: number;
   slug: string;
   activities_date: string;
   created_by_id: number;
   status: boolean;
   deleted_at: string;
   created_at: string;
   updated_at: string;
}
