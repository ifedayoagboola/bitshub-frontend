export interface Menus{
  data: Menu[];
}

export interface Menu{
  id?: number;
  title?: string;
  path?: string;
  type?: string;
  active?: boolean;
  tag?: string;
  trending?: boolean;
  mega_menu?: boolean;
  mega_menu_type?: string;
  level?: number;
  children?: Menu[];
  section?: Menu[];
}

