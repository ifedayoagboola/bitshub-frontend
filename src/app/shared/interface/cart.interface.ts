import { Product, Variation } from "./product.interface";

export interface CartModel {
    is_digital_only: boolean;
    items: Cart[];
    total?: number;
}

export interface Cart {
    id: number;
    product_id: number;
    variation: Variation;
    variation_id: number | null;
    wholesale_price: number | null;
    consumer_id?: number;
    quantity: number;
    sub_total: number;
    product: Product;
    created_by_id?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

export interface CartAddOrUpdate {
    id: number | null;
    product: Product | null;
    product_id: number;
    variation: Variation | null;
    variation_id: number | null;
    quantity: number;
}