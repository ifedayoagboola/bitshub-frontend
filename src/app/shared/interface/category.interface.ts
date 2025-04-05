import { PaginateModel } from "./core.interface";
import { Attachment } from "./attachment.interface";

export interface CategoryModel extends PaginateModel {
    data: Category[];
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    type: string;
    parent_id?: number;
    category_image?: Attachment;
    category_image_id?: number;
    category_icon?: Attachment;
    category_icon_id?: number;
    commission_rate?: number;
    subcategories?: Category[];
    products_count: number;
    category_meta_image_id: number;
    category_meta_image: Attachment;
    meta_title: string;
    meta_description: string;
    status: boolean;
    created_by_id?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
