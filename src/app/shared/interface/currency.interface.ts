import { PaginateModel } from "./core.interface";

export interface CurrencyModel extends PaginateModel {
    data: Currency[];
}

export interface Currency {
    id: number;
    code: string;
    symbol: string;
    no_of_decimal: number;
    exchange_rate: number;
    symbol_position: string;
    thousands_separator: string;
    decimal_separator: string;
    status: boolean;
    created_by_id: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}

