export interface RoleDetial {
  roleId?: string | number | null;
  roleName?: string;
  roleStatus?: string | number;
  [key: string]: any;
}

export interface PermissionIdsAndRoleId {
  roleId: string | number | null;
  menuIds: string[];
}

export interface UserIdsAndRoleId {
  roleId: string | number | null;
  userIds: string[];
}
export interface UserIdAndRoleID {
  roleId: string | number | null;
  userId: string | number | null;
}
