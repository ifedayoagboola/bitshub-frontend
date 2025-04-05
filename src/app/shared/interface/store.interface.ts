import { Attachment } from "./attachment.interface";
import { PaginateModel } from "./core.interface";
import { Country } from "./country.interface";
import { States } from "./state.interface";
import { User } from "./user.interface";

export interface StoresModel extends PaginateModel {
  data: Stores[];
}

export interface Stores {
  id: number;
  address: string;
  city: string;
  country: Country;
  country_id: number;
  description: string;
  hide_vendor_email: boolean;
  hide_vendor_phone: boolean;
  pincode: string;
  product_images: string[];
  slug:string;
  state: States;
  state_id: number;
  status: boolean;
  total_in_approved_stores: number;
  is_approved: boolean;
  store_logo: Attachment;
  store_logo_id: number;
  store_cover_id: number;
  store_cover: Attachment;
  store_name:string;
  vendor: User;
  vendor_id: number;
  facebook: string,
  instagram: string,
  pinterest: string,
  youtube: string,
  twitter: string,
  vendor_name: string;
  order_amount: number;
  orders_count: number;
  reviews_count: number;
  rating_count: number;
  products_count: number;
  created_at?: string;
  updated_at?: string;
}
