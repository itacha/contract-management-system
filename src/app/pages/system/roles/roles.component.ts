import { Component, OnInit, Input } from '@angular/core';
import { SystemService } from '../system.service';
import { STColumn } from '@delon/abc';
import { BaseOfSimpleTable } from '../../comm';
import { LIST_ACCOUNTS_COLUMNS } from '../accounts/schema/list-account';
import { RolesService } from './roles.service';
import { ApiResToComponent, ShowModalService } from 'app/basic';
import { SFSchema } from '@delon/form';
import { Observable } from 'rxjs';
import { RoleEditComponent } from './role.edit.component';
import { RoleDetial } from './interface';
import { PermissionChoosePageComponent } from './permission.choose.component';
import { AccountsChoosePageComponent } from './accounts.choose.component';

@Component({
  selector: 'app-roles-page',
  templateUrl: './roles.component.html',
  styles: [],
})
export class RolesPageComponent extends BaseOfSimpleTable implements OnInit {
  defaultDataRules: any;

  params: any;
  searchSchema: SFSchema;

  scroll = { x: '900px' };

  @Input()
  domain = 'role';
  title = '角色管理';
  head_content = '角色管理用于配置角色、角色权限和角色下的用户。';
  selectedItem: any = {};
  slaveQueryParams: any = {};
  count: number;
  countRole: number;
  RoleUserList = [];
  ps = 10;
  // 角色列表
  entries = [];

  constructor(
    public systemSer: SystemService,
    public roleSer: RolesService,
    private modal: ShowModalService,
  ) {
    super();
  }

  // 路由复用时，进入当前页会执行的方法，可以在此调用此页的初始化方法
  _onReuseInit() {
    this.ngOnInit();
  }

  // 当路由复用时，离开当前页会执行的方法，根据需要自行设置
  _onReuseDestroy() { }

  operations: STColumn[] = [
    {
      title: '操作',
      buttons: [
        {
          text: '移出',
          type: 'del',
          popTitle: '确定移出吗？',
          click: item => {
            const param = {
              roleId: this.selectedItem.roleId,
              userId: item.userId,
            };
            this.roleSer
              .removeUserFromRole(param)
              .subscribe((res: ApiResToComponent) => {
                if (res.isComplete) {
                  this.getRoleUserList();
                }
              });
          },
        },
      ],
    },
  ];

  columns: STColumn[] = [...LIST_ACCOUNTS_COLUMNS, ...this.operations];

  ngOnInit() {
    // 获取角色列表
    this.getRolesList();
    // 执行继承对象的ngOnInit方法
    // super.ngOnInit();
  }

  // 获取角色列表
  getRolesList() {
    this.roleSer.getAllRolesList().subscribe((res: ApiResToComponent) => {
      this.entries = res.items;
      this.countRole = res.count;
    });
  }

  // 被继承对象内需要实现的方法（以后可以做功能拓展）
  getListDataOfRules(): Observable<ApiResToComponent> {
    throw new Error('Method not implemented.');
  }
  // 被继承对象内需要实现的方法（以后可以做功能拓展）
  getAllListData(): Observable<ApiResToComponent> {
    throw new Error('Method not implemented.');
  }

  async editPermission(item: RoleDetial) {
    // 先根据角色获取此角色原有的权限
    const params = item.roleId
    const menuList: ApiResToComponent = await this.roleSer
      .getRoleMenuList(params)
      .toPromise();
    this.modal
      .creatStaticModal(
        PermissionChoosePageComponent,
        {
          roleId: item.roleId,
          includeAllChecked: true,
          asyncData: () => {
            return this.systemSer.menuTreeNode(menuList.items);
          },
        },
        'md',
        {
          nzTitle: `编辑${item.roleName}的权限`,
        },
      )
      .subscribe(res => {
        if (res) {
        }
      });
  }

  removeRole(item: RoleDetial) {
    this.roleSer.delRole(item).subscribe((res: any) => {
      if (res) {
        this.getRolesList();
      }
    });
  }

  editRole(item: RoleDetial) {
    this.modal
      .creatStaticModal(RoleEditComponent, { item: item }, 'md', {
        nzTitle: '修改角色' + item.roleName,
      })
      .subscribe(res => {
        if (res) {
          this.getRolesList();
        }
      });
  }

  async addAccountsToRole(item: RoleDetial) {
    this.modal
      .creatStaticModal(
        AccountsChoosePageComponent,
        {
          roleId: item.roleId,
          reqReName:{
            params: { roleId:item.roleId},
            allInBody:true,
            reName: {
              pi: 'pageNum',
              ps: 'pageSize',
            },
            method: 'POST'
          }
        },
        'lg',
        {
          nzTitle: '添加' + item.roleName + '角色成员',
        },
      )
      .subscribe(res => {
        if (res) {
          this.getRoleUserList();
        }
      });
  }

  select(item) {
    this.selectedItem = item;
    this.getRoleUserList();
  }

  // 根据角色获取用户列表
  getRoleUserList() {
    const params = { roleId: this.selectedItem.roleId };
    this.roleSer
      .getAllUsersOfRole(params)
      .subscribe((res: ApiResToComponent) => {
        if (res) {
          this.RoleUserList = res.items;
          this.count = res.count;
        }
      });
  }

  addRole() {
    this.modal
      .creatStaticModal(RoleEditComponent, { item: {} }, 'md', {
        nzTitle: '新增角色',
      })
      .subscribe(res => {
        if (res) {
          this.getRolesList();
        }
      });
  }

  // 移除角色下的用户
  removeUserFromRole(item) {
    const params = { roleId: this.selectedItem.roleId, userId: item.userId };
    this.roleSer
      .removeUserFromRole(params)
      .subscribe((res: ApiResToComponent) => {
        if (res.isComplete) this.getRoleUserList();
      });
  }
}
