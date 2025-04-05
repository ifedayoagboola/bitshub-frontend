export interface Tax {
  id: number,
  name: string,
  rate: number,
  country_id: number,
  state_id: number,
  pincode: number,
  city: string,
  status: boolean,
  created_by_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
