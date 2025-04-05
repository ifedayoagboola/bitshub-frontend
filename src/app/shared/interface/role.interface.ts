export interface Role {
  id: number;
  name: string;
  guard_name?: string;
  created_at?: string;
  updated_at?: string;
  permissions?: Permission[];
}

export interface Module {
  id: number;
  name: string;
  isChecked: boolean;
  created_at?: string;
  updated_at?: string;
  module_permissions: Permission[];
}

export interface Permission {
  id: number;
  permission_id: number;
  name: string;
  isChecked?: boolean;
  guard_name?: string;
  created_at?: string;
  updated_at?: string;
}
