import { Attachment } from "./attachment.interface";
import { PaginateModel } from "./core.interface";

export interface BrandModel extends PaginateModel {
    data: Brand[];
}
  
export interface Brand {
    id: number;
    name: string;
    slug: string;
    brand_image_id?: number;
    brand_image?: Attachment;
    brand_banner_id: number;
    brand_banner: Attachment;
    brand_meta_image_id: number;
    brand_meta_image: Attachment;
    meta_title: string;
    meta_description: string;
    status: boolean;
    created_by_id: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}