export interface UserDetial {
  userId?: string | number | null;
  loginName?: string;
  userName?: string;
  mainTelphone?: string;
  passWord?: string;
  userStatus?: string;
  groupId?:string;
  [key: string]: any;
}
export interface UserGroupDetial {
  groupId?: string | null;
  parentId?: string | null;
  groupCode?: string;
  groupName?: string;
  groupDesc?: string;
  groupSort?: number;
  groupNode?: string;
  remark?: string;
  [key: string]: any;
}
