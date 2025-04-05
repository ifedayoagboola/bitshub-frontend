import { PaginateModel } from "./core.interface";

export interface DownloadModel extends PaginateModel {
  data: Download[];
}

export interface Download {
  id: number;
  item_name: string;
  item_image: string;
  can_download_file: boolean;
  can_download_license: boolean;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}