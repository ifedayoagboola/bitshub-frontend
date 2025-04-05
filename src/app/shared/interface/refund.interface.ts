import { Attachment } from "./attachment.interface";
import { PaginateModel } from "./core.interface";
import { Order } from "./order.interface";
import { Stores } from "./store.interface";
import { User } from "./user.interface";

export interface RefundModel extends PaginateModel {
    data: Refund[];
}

export interface Refund {
    id: number;
    reason: string;
    amount: number;
    quantity: number;
    store_id: number;
    store: Stores;
    order: Order;
    order_id?: string;
    order_number: number;
    product_id: number;
    consumer_id: number;
    user: User;
    consumer_name?: string;
    consumer_phone?: string;
    variation_id?: number;
    refund_image_id: number;
    payment_type: string;
    status: string;
    refund_status: string;
    is_used: number;
    refund_image: Attachment;
    total_pending_refunds: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
