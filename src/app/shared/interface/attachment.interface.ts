import { PaginateModel } from "./core.interface";

export interface AttachmentModel extends PaginateModel {
    data: Attachment[];
}

export interface Attachment {
  id: number;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: string;
  original_url: string;
  created_by_id: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
