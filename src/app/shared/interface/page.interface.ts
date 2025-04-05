import { Attachment } from "./attachment.interface";
import { PaginateModel } from "./core.interface";

export interface PageModel extends PaginateModel {
  data: Page[];
}

export interface Page {
  id: number;
  title: string;
  slug: string;
  content: string;
  status: boolean;
  meta_title: string;
  meta_description: string;
  page_meta_image_id: number;
  page_meta_image: Attachment;
  created_by_id?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface FaqModel extends PaginateModel {
  data: Faq[];
}

export interface Faq {
  id: number;
  title: string;
  description: string;
  created_by_id: boolean;
  status: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface FooterPage {
  link: string;
  label: string;
}

export interface ContactUsModel {
  name : string;
  email: string;
  phone: number;
  subject: string;
  message: string;
}
