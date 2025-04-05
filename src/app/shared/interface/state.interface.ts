import { PaginateModel } from "./core.interface";

export interface StatesModel extends PaginateModel {
    data: States[];
}

export interface States {
    id: number;
    name: string;
    country_id: number;
}
