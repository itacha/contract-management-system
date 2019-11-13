import { Component, OnInit, Input } from '@angular/core';
import { STColumn } from '@delon/abc';
import { BaseOfSimpleTable } from '../../comm';
import { ApiResToComponent, ShowModalService } from 'app/basic';
import { SFSchema } from '@delon/form';
import { Observable } from 'rxjs';
import { SEARCH_CUSTOM_SCHEMA } from './schema/search-custom';
import { LIST_CUSTOM_COLUMNS } from './schema/list-custom';
import { CustomService } from '../custom.service';
import { ListService } from './list.service';
import { CustomerDetial } from './interface';
import { ListEditComponent } from './list.edit.component';

@Component({
  selector: 'app-custom-list-page',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListPageComponent extends BaseOfSimpleTable implements OnInit {
  defaultDataRules: any;

  params: any = {};
  searchSchema: SFSchema = SEARCH_CUSTOM_SCHEMA;

  scroll = { x: '900px' };

  @Input()
  title = '客户列表';
  head_content = '显示所有客户的信息。';

  ps = 10;
  // 客户列表
  DataList = [];

  constructor(public customSer: CustomService, 
              public listSer: ListService,
              public modal: ShowModalService,) {
    super();
  }

  // 路由复用时，进入当前页会执行的方法，可以在此调用此页的初始化方法
  _onReuseInit() {
    this.ngOnInit();
  }

  // 当路由复用时，离开当前页会执行的方法，根据需要自行设置
  _onReuseDestroy() {}

  operations: STColumn[] = [
    {
      title: '操作区',
      buttons: [
        {
          text: '修改',
          type: 'none',
          click: (record: any) => {
            this.updateCustomer(record);
          },
        },
        {
          text: '删除',
          type: 'del',
          popTitle: '删除后数据无法恢复，确定删除吗？',
              format: () => `<span class="text-error">删除</span>`,
              click: (record: any) => {
                this.deleteCustomer(record.customerId);
              },
        },
      ],
      className: 'text-center',
    },
  ];

  columns: STColumn[] = [...LIST_CUSTOM_COLUMNS,...this.operations];

  ngOnInit() {
    // 获取客户列表
    this.getCustomsList();
    // 执行继承对象的ngOnInit方法
    // super.ngOnInit();
  }

  getCustomsList() {
    this.listSer.getCustomsList({}).subscribe((res: ApiResToComponent) => {
      if (res) {
        this.DataList = res.items;
      }
    });
  }
  //获取搜索条件下的客户列表
  searcherCustomerList(param){
    this.listSer.getCustomsList(param).subscribe((res: ApiResToComponent) => {
      if (res) {
        this.DataList = res.items;
      }
    });
  }

  getListDataOfRules(): Observable<ApiResToComponent> {
    throw new Error('Method not implemented.');
  }
  getAllListData(): Observable<ApiResToComponent> {
    throw new Error('Method not implemented.');
  }

  //进入新增用户编辑框
  addCustomer(){
    this.modal
    .creatStaticModal(ListEditComponent, 
      { item: {}}, 'md', {
      nzTitle: '新增客户',
    })
    .subscribe(res => {
      if (res) {
        this.searcherCustomerList(this.params);
      }
    });
  }
  //进入修改用户编辑框
   updateCustomer(item: CustomerDetial) {
    this.modal
      .creatStaticModal(
        ListEditComponent,
        {item:item},'md',
        {
          nzTitle: `编辑${item.customerName}的信息`,
        },
      )
      .subscribe(res => {
        if (res) {
          this.searcherCustomerList(this.params);
        }
      });
  }
  //删除用户
    deleteCustomer(id: string) {
      const deleteParam = { customerId: id };
      if (id != null && id !== '') {
        this.listSer.deleteCustomer(deleteParam).subscribe((res: ApiResToComponent) => {
          if (res){
            this.searcherCustomerList(this.params);
          }
        });
      }
    }

    //条件搜索
    searchDataGet(event){
      this.params = {};
      if(event.createTimeStart){
        this.params.createTimeStart = event.createTimeStart;
      }
      if(event.createTimeEnd){
        this.params.createTimeEnd = event.createTimeEnd;
      }
      if(event.verifyStatus){
        this.params.verifyStatus = event.verifyStatus;
      }
      if(event.customerName){
        this.params.customerName = event.customerName;
      }
     this.searcherCustomerList(this.params);
    }
    //重置查询条件
    reSetDataGet(param){
      this.params = {};
      this.getCustomsList();
    }
}
