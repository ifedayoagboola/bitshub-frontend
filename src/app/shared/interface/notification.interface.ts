import { PaginateModel } from "./core.interface";

export interface NotificationModel extends PaginateModel {
    data: Notification[];
}

export interface Notification {
    id: string;
    type: string;
    notifiable_type: string;
    notifiable_id: number;
    data: Data;
    read_at?: string;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    total?: number;
}

export interface Data {
    title: string;
    message: string;
    type: string;
}
