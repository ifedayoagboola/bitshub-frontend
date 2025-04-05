import { PaginateModel } from "./core.interface";
import { States } from "./state.interface";

export interface CountryModel extends PaginateModel {
    data: Country[];
}

export interface Country {
    id: number;
    capital: string;
    citizenship: string;
    country_code: string | number;
    currency: string;
    currency_code: string;
    currency_sub_unit: string;
    currency_symbol: string;
    currency_decimals: string | number;
    full_name: string;
    iso_3166_2: string;
    iso_3166_3: string;
    name: string;
    region_code: string | number;
    sub_region_code: string | number;
    eea: string | number;
    calling_code: string | number;
    flag: string;
    state: States[];
}
