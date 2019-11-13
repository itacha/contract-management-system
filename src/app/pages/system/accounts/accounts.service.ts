import { _HttpClient } from '@delon/theme';
import { Injectable, Injector } from '@angular/core';
import { ApiResponse, CommBasicService, ErrorApiRequest, ApiResToComponent } from 'app/basic';
import { UserDetial, UserGroupDetial } from './interface';
import { map } from 'rxjs/operators';
import { SFSchemaEnumType } from '@delon/form';
import { Observable } from 'rxjs';
import { SystemService } from 'app/pages/system';
import { NzTreeNode } from 'ng-zorro-antd';

@Injectable()
export class AccountsService extends CommBasicService {
  constructor(public injector: Injector,
    public systemSer: SystemService) {
    super(injector);
  }

  // 创建用户
  saveAccountInfo(param: UserDetial) {
    return this.client.post(this.apiUrl.Sysuser.saveSysUser, param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '创建用户', color: 'green' },
          true,
          true,
        );
      }),
    );
  }

  // 修改用户
  updateAccountInfo(param: UserDetial) {
    return this.client.post(this.apiUrl.Sysuser.updateSysUser, param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '修改用户', color: 'green' },
          true,
          true,
        );
      }),
    );
  }
  // 更新用户状态
  updateStatus(param: UserDetial) {
    return this.client.post(this.apiUrl.Sysuser.updateStatus, param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '更新用户状态', color: 'grey' },
          true,
          true,
        );
      }),
    );
  }

  // 重置用户密码
  resetPassWord(param) {
    return this.client.post(this.apiUrl.Sysuser.resetPassWord, param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '重置用户密码', color: 'grey' },
          true,
          true,
        );
      }),
    );
  }

  // 删除用户
  deleteUer(deleteParam: UserDetial) {
    return this.client.post(this.apiUrl.Sysuser.delete, deleteParam).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '删除单个用户', color: 'grey' },
          true,
          true,
        );
      }),
    );
  }

   //创建用户分组
  saveUserGroup(param:UserGroupDetial){
    return this.client.post(this.apiUrl.SysUserGroup.saveUserGroup,param).pipe(
      map((ev:ApiResponse)=>{
        return this.doWithResponse(
          ev,
          {msg:'新增用户分组',color:'grey'},
          true,
          true
        );
      })
    );
  }
  //修改用户分组
  updateUserGroup(param:UserGroupDetial){
    return this.client.post(this.apiUrl.SysUserGroup.updateUserGroup,param).pipe(
      map((ev:ApiResponse)=>{
        return this.doWithResponse(
          ev,
          {msg:'修改用户分组',color:'grey'},
          true,
          true
        );
      })
    );
  }
  //删除用户分组
  deleteUserGroup(param:UserGroupDetial){
    return this.client.post(this.apiUrl.SysUserGroup.deleteUserGroup,param ).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '删除用户分组', color: 'grey' },
          true,
          true,
        );
      }),
    );
  }
  //获取角色多选框
  findMenuCheckBoxList():Observable<SFSchemaEnumType[]>{
    return this.client.get(this.apiUrl.Sysrole.findRoleAllList).pipe(
      map((ev:ApiResponse) =>{
        if (ev.code !== '10200') {
          this.msg.error(ev.msg);
          this.log.logObj(ev, '获取角色列表', 'grey');
          return ;
        } else {
          const new_items = [];
          ev.data.forEach(element => {
            new_items.push({ label: element.roleName, value: element.roleId });
          });
          return new_items;
        }
      })
    );
  }
  //获取用户分组树
   findGroupTreeList(param):Observable<SFSchemaEnumType[]>{
    return this.client.get(this.apiUrl.SysUserGroup.findUserGroupTree).pipe(
      map((ev:ApiResponse)=>{
        if (ev.code !== '10200') {
          this.msg.error(ev.msg);
          this.log.logObj(ev, '获取角色列表', 'grey');
          return;
        } else {
          return ev.data;
        }
      })
    );
  }
   // 获取分组下用户列表
   getAllUsersOfGroup(param: UserGroupDetial) {
    return this.client
      .get(this.apiUrl.Sysuser.findList, param)
      .pipe(
        map((ev: ApiResponse) => {
          return this.doWithResponse(
            ev,
            { msg: '获取角色下用户列表', color: 'grey' },
            true,
            true,
          );
        }),
      );
  }
  //获取分组详情
  findUserGroupById(param:UserGroupDetial){
    return this.client.get(this.apiUrl.SysUserGroup.findUserGroupById,param).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '获取分组详情', color: 'grey' },
          true,
          false,
        );
      }),
    );
  }
  //获取分组列表信息
  findeUserGroupList(params:any){
    return this.client.get(this.apiUrl.SysUserGroup.findeUserGroupList, params).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '获取全部菜单列表', color: 'green' },
          true,
        );
      }),
    );
  }
}
