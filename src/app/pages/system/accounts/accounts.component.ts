import { NzMessageService, NzTreeNode } from 'ng-zorro-antd';
import { Component, OnInit, Injector } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { STColumn, STReq, STRes } from '@delon/abc';
import {
  ApiUrlDataService,
  ApiResToComponent,
  ShowModalService,
} from 'app/basic';
import { SFSchema, SFSchemaEnumType } from '@delon/form';
import { AccountEditComponent } from './account.edit.component';
import { SEARCH_ACCOUNTS_SCHEMA } from './schema/search-account';
import { AccountsService } from './accounts.service';
import { UrlOfSimpleTable } from '../../comm';
import { UserDetial, UserGroupDetial } from './interface';
import { LIST_ACCOUNTS_DETAIL_COLUMNS } from './schema/list-account-detail';
import { group } from '@angular/animations';
import { AccountGroupEditComponent } from './account.group.edit.component';
import { SystemService } from '..';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account-page',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.less'],
})
export class AccountsPageComponent extends UrlOfSimpleTable implements OnInit {
  // 请求参数的地址
  url: string = this.apiUrl.Sysuser.findList;
  //功能页头描述
  head_content = '用户管理用于系统用户的信息维护。';
  // 搜索条件字段
  searchSchema: SFSchema = SEARCH_ACCOUNTS_SCHEMA;
  // 默认搜索条件
  params: any;
  // 表格大小
  tableSize = 'middle';
  // 卡片表头
  cardTitle = '全部用户';
   // 默认展开节点
   // defaultExpandedKeys:string[] = ['0'];
   // 默认勾选节点
   defaultSelectedKeys:string[] =[];
   // 分组下拉树节点
   nodes:NzTreeNode[] = [];
   // 分组下用户
   groupUserList = [];
  // 当前选中节点
  selectNodeItem:any = {};
  // 表格额外操作
  operations: STColumn[] = [
    {
      title: '操作区',
      width: '180px',
      buttons: [
        {
          text: '修改',
          type: 'none',
          click: (record: any) => {
            this.editUser(record);
          },
        },
        {
          text: '禁用',
          type: 'del',
          iif: (record: any) => {
            if (record.userStatus === '1') {
              return true;
            }
          },
          popTitle: '确定禁用吗？',
          format: () => `<span class="text-yellow">禁用</span>`,
          click: (record: any) => {
            this.updateUserStatus(record.userId, '0');
          },
        },
        {
          text: '启用',
          type: 'del',
          iif: (record: any) => {
            if (record.userStatus === '0') {
              return true;
            }
          },
          popTitle: '确定启用吗？',
          format: () => `<span class="text-green">启用</span>`,
          click: (record: any) => {
            this.updateUserStatus(record.userId, '1');
          },
        },
        {
          text: '更多',
          type: 'none',
          children: [
            {
              text: '重置密码',
              type: 'del',
              popTitle: '确定重置吗？',
              format: () => `<span class="text-green">重置密码</span>`,
              click: (record: any) => {
                this.resetPassWord(record.userId);
              },
            },
            {
              text: '删除',
              type: 'del',
              popTitle: '删除后数据无法恢复，确定删除吗？',
              format: () => `<span class="text-error">删除用户</span>`,
              click: (record: any) => {
                this.deleteUer(record.userId);
              },
            },
          ],
        },
      ],
      className: 'text-center',
    },
  ];
  // 用户列表项
  columns: STColumn[] = [...LIST_ACCOUNTS_DETAIL_COLUMNS, ...this.operations];

  // 重命名请求参数
  reqReName: STReq = {
    reName: {
      pi: 'pageNum',
      ps: 'pageSize',
    },
    params: this.params,
    allInBody: true,
    method: 'POST'
  };
  // 匹配返回的结果
  resReName: STRes = {
    reName: {
      total: 'count',
      list: 'data',
    },
  };

  constructor(
    private apiUrl: ApiUrlDataService,
    private message: NzMessageService,
    private accSer: AccountsService,
    public modal: ShowModalService,
    public systemSer: SystemService
  ) {
    super();
  }

  // 路由复用时，进入当前页会执行的方法，可以在此调用此页的初始化方法
  _onReuseInit() {
    this.ngOnInit();
  }

  // 当路由复用时，离开当前页会执行的方法，根据需要自行设置
  _onReuseDestroy() {}

  // 初始化加载(分组树)
  ngOnInit() {
    this.getGroupNode();
  }

  //获取分组树节点
  getGroupNode(){
    const param ={};
    this.accSer.findeUserGroupList(param).subscribe((res:ApiResToComponent)=>
      {
        if(res.isComplete){
          this.systemSer.groupTreeNode(res.items).subscribe((res1:NzTreeNode[])=>{
            this.nodes = res1;
          })
        }
      });
  }
  // 跳入新建用戶页面
  async addUser() {
    const groupTree: SFSchemaEnumType[] = await this.accSer
    .findGroupTreeList({})
    .toPromise();
    if(this.selectNodeItem.groupId==='0'){
      this.message.create('warning','不能在根目录下添加用户!');  
      return;
    }
    this.modal
      .creatStaticModal(AccountEditComponent, 
        { item: {groupId:this.selectNodeItem.groupId}, 
         asyncData: () => {
        return new Observable(observer => {
          observer.next(groupTree);
          observer.complete();
        });
      }, }, 'md', {
        nzTitle: '新增用户',
      })
      .subscribe(res => {
        if (res) {
          this.st.reset();
        }
      });
  }
  // 弹出用户编辑框
  async editUser(item: UserDetial) {
    const groupTree: SFSchemaEnumType[] = await this.accSer
    .findGroupTreeList({})
    .toPromise();
    this.modal
      .creatStaticModal(AccountEditComponent, 
        { item: item,
          asyncData: () => {
            return new Observable(observer => {
              observer.next(groupTree);
              observer.complete();
            });
      }, }, 'md', {
        nzTitle: '修改用户',
      })
      .subscribe(res => {
        if (res) {
          this.st.reset();
        }
      });
  }
  // 禁用或启用用戶
  updateUserStatus(id: string, userStatus: string) {
    const updateStatus = { userId: id, userStatus: userStatus };
    if (id == null || id === '' || userStatus == null || userStatus === '') {
      this.message.create('error', '未获取人员id或状态!');
      return;
    }
    this.accSer
      .updateStatus(updateStatus)
      .subscribe((res: ApiResToComponent) => {
        if (res.isComplete) this.st.reset();
      });
  }
  // 根据条件搜索数据
  searchDataGet(event): void {
    if(this.selectNodeItem.groupId){
      if(this.selectNodeItem.groupId !== '0'){
        Object.assign(event, {groupId: this.selectNodeItem.groupId});
      }else{
        Object.assign(event, {groupId: ''});
      }
    }
    //  if(event.loginName){
    //    event.loginName = this.transferSpecial(event.loginName);
    //  }
    this.st.reset(event);
  }

  // 重置表格的搜索事件
  reSetDataGet(event): void {
    this.st.reset(event);
  }
  // 单个删除用户
  deleteUer(id: string) {
    const deleteParam = { userId: id };
    if (id != null && id !== '') {
      this.accSer.deleteUer(deleteParam).subscribe((res: ApiResToComponent) => {
        if (res) this.st.reset();
      });
    }
  }

  

  // 重置密码
  resetPassWord(id: string) {
    const updateParam = { userId: id };
    if (id !== null && id !== '') {
      this.accSer
        .resetPassWord(updateParam)
        .subscribe((res: ApiResToComponent) => {
          if (res) {
          }
        });
    }
  }
  // 删除单个用户分组
deleteUerGroup(id: string) {
  const deleteParam = { groupId: id };
  if(id == null || id ===''){
    this.message.create('error','未获取分组id');
    return;
  }
  this.accSer.deleteUserGroup(deleteParam).subscribe((res: ApiResToComponent) => {
    if(res.isComplete){
        this.getGroupNode();
        //删除选项后刷新列表
        if(deleteParam.groupId===this.selectNodeItem.groupId){
            this.selectNodeItem.groupId = '0';
        }
        this.getUserListCommon();
    }
  });
}
  //弹出分组编辑框
  async updateUserGroup(item:UserGroupDetial){
    const groupId:any = item.groupId;
    let groupDetail:any;
    if(groupId == null||groupId===''){
      this.message.create('error','未获取分组id');
      return;
    }
    const groupTree: SFSchemaEnumType[] = await this.accSer
    .findGroupTreeList({})
    .toPromise();
    this.accSer.findUserGroupById(item).subscribe((res:ApiResToComponent)=>{
      if(res.isComplete){
        groupDetail = res.items;
        this.modal.creatStaticModal(AccountGroupEditComponent,
          {item:groupDetail,
            
          asyncData: () => {
              return new Observable(observer => {
                observer.next(groupTree);
                observer.complete();
              });
            },
          },
          "md",
          {
          nzTitle:'修改分组信息'
        }).subscribe( (res) =>{
          this.getGroupNode();
          this.getUserListCommon();
        });
      }
    }); 
  }
  //弹出新增分组框
  async addUserGroup(item:UserGroupDetial){
    const groupTree: SFSchemaEnumType[] = await this.accSer
    .findGroupTreeList({})
    .toPromise();
    const param = {parentId:item.groupId}
    this.modal.creatStaticModal(AccountGroupEditComponent,
      {item:param,
        asyncData: () => {
          return new Observable(observer => {
            observer.next(groupTree);
            observer.complete();
          });
        },
      },
      'md',{
      nzTitle:'新增分组信息'
    }).subscribe(res=>{
      this.getGroupNode();
      //重新加载一次表格

    });
  }
  //获取分组下用户列表
  // getAllUsersOfGroup(param:UserGroupDetial){
  //   const params = { groupId: param.groupId };
  //     this.accSer
  //       .getAllUsersOfGroup(params)
  //       .subscribe((res: ApiResToComponent) => {
  //         if (res) {
  //           this.groupUserList = res.items;
  //         }
  //       });
  // }
  //单击事件
  treeClick(item){
    this.nodeToGroup(item.node)
    this.defaultSelectedKeys = [this,this.selectNodeItem.groupId]
    this.getUserListCommon();
  }
  //右键事件
  treeRightClick(item){
    const node:NzTreeNode = item.node;
    //this.nodeToGroup(node);
    this.updateUserGroup({groupId:node.key,
      groupName:node.title});
  }
  //node装换为所需分组节点
  nodeToGroup(node){
    this.selectNodeItem = {
      groupId:node.key,
      groupName:node.title
    }
  }
  //分组变动后加载表格通用
  getUserListCommon(){
    if(this.selectNodeItem.groupId&&this.selectNodeItem.groupId!=='0'){
      this.cardTitle ='['+ this.selectNodeItem.groupName+']组的用户';
      Object.assign(this.params,{groupId:this.selectNodeItem.groupId});
    }else{
      this.cardTitle ='全部用户';
      Object.assign(this.params,{groupId:''});
    }
    this.st.reset(this.params);
  }

  //转换特殊字符串 测试中
  transferSpecial(param:string): string {
    let result = param;
    console.log(param.indexOf('\+'));
    if(param.indexOf('\+')>=0){
      result =  param.replace(/\+/g, '\%2B');
    }
    return result;
  }
}
