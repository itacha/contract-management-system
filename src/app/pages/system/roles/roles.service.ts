import { _HttpClient } from '@delon/theme';
import { Injectable, Injector } from '@angular/core';
import { ApiResponse, CommBasicService } from 'app/basic';
import { map } from 'rxjs/operators';
import {
  RoleDetial,
  PermissionIdsAndRoleId,
  UserIdsAndRoleId,
  UserIdAndRoleID,
} from './interface';

@Injectable()
export class RolesService extends CommBasicService {
  constructor(public injector: Injector) {
    super(injector);
  }

  // 创建角色
  saveRoleInfo(param: RoleDetial) {
    return this.client.post(this.apiUrl.Sysrole.saveRole, param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '创建角色', color: 'green' },
          true,
          true,
        );
      }),
    );
  }

  // 修改角色
  updateRoleInfo(param: RoleDetial) {
    return this.client.post(this.apiUrl.Sysrole.updateRole, param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '修改角色', color: 'green' },
          true,
          true,
        );
      }),
    );
  }

  // 获取角色列表
  getAllRolesList() {
    return this.client.get(this.apiUrl.Sysrole.findRoleAllList).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '获取角色列表', color: 'green' },
          true,
        );
      }),
    );
  }

  // 获取角色下用户列表
  getAllUsersOfRole(param: RoleDetial) {
    return this.client
      .post(this.apiUrl.Sysrole.findUserListByRoleId, param)
      .pipe(
        map((ev: ApiResponse) => {
          return this.doWithResponse(
            ev,
            { msg: '获取角色下用户列表', color: 'green' },
            true,
            false,
          );
        }),
      );
  }
   // 根据角色ID获取不在该角色下的用户列表
   findUserNotInRoleId(param: RoleDetial) {
    return this.client
      .post(this.apiUrl.Sysrole.findUserNotInRoleId, param)
      .pipe(
        map((ev: ApiResponse) => {
          return this.doWithResponse(
            ev,
            { msg: '获取角色下用户列表', color: 'green' },
            true,
            true,
          );
        }),
      );
  }

  // 删除角色
  delRole(param: RoleDetial) {
    return this.client.post(this.apiUrl.Sysrole.delRole, param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '删除角色', color: 'green' },
          true,
          true,
        );
      }),
    );
  }

  // 根据角色ID获取菜单列表，并有默认选中项
  findMenuListByRoleId(param: RoleDetial) {
    return this.client
      .post(this.apiUrl.Sysrole.findMenuListByRoleId, param)
      .pipe(
        map((ev: ApiResponse) => {
          return this.doWithResponse(
            ev,
            { msg: '根据角色ID获取所有菜单和权限列表', color: 'green' },
            true,
            true,
          );
        }),
      );
  }

  // 获取全部菜单列表
  getAllMenuList() {
    return this.client.get(this.apiUrl.Sysmenu.findMenuList).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '获取全部菜单列表', color: 'green' },
          true,
        );
      }),
    );
  }
  // 获取全部菜单列表
  getRoleMenuList(params: any) {
    return this.client.post(this.apiUrl.Sysmenu.findAllMenuList, params).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '获取全部菜单列表', color: 'green' },
          true,
        );
      }),
    );
  }

  // 获取所有用户列表
  getAllUserList() {
    return this.client.get(this.apiUrl.Sysuser.findList).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '获取所有用户列表', color: 'green' },
          true,
        );
      }),
    );
  }

  // 将所有选择的权限结果提交到服务器
  sendPermissionsToServer(params: PermissionIdsAndRoleId) {
    return this.client.post(this.apiUrl.Sysrole.assignMenusToRole, params).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '角色中分配权限', color: 'green' },
          true,
          true,
        );
      }),
    );
  }

  // 将所有选择的用户结果提交到服务器
  sendUsersToServer(params: UserIdsAndRoleId) {
    return this.client.post(this.apiUrl.Sysrole.addUsersToRole, params).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '角色中分配用户', color: 'green' },
          true,
          true,
        );
      }),
    );
  }

  // 从角色用户中删除单个用户
  removeUserFromRole(params: UserIdAndRoleID) {
    return this.client
      .post(this.apiUrl.Sysrole.removeUserFromRole, params)
      .pipe(
        map((ev: ApiResponse) => {
          return this.doWithResponse(
            ev,
            { msg: '从角色用户中删除单个用户', color: 'grey' },
            true,
            true,
          );
        }),
      );
  }
}
