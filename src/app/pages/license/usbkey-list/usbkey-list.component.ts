import { Component, OnInit, Input } from '@angular/core';
import { STColumn } from '@delon/abc';
import { BaseOfSimpleTable } from '../../comm';
import { ApiResToComponent, ShowModalService } from 'app/basic';
import { SFSchema, SFSchemaEnumType } from '@delon/form';
import { Observable } from 'rxjs';
import { LicenseService } from '../license.service';
import { LIST_USBKEY_LICENSE_COLUMNS } from './schema/list-usbkey-license';
import { SEARCH_USBKEY_LICENSE_SCHEMA } from './schema/search-usbkey-license';
import { UsbkeyListService } from './usbkey-list.service';
import { ListService } from '../../contract/list/list.service';

@Component({
  selector: 'app-license-usbkey-list-page',
  templateUrl: './usbkey-list.component.html',
  styleUrls: ['./usbkey-list.component.less'],
})
export class UsbkeyListPageComponent extends BaseOfSimpleTable
  implements OnInit {
  defaultDataRules: any;

  params = [];
  searchSchema: SFSchema = SEARCH_USBKEY_LICENSE_SCHEMA;

  scroll = { x: '900px' };

  @Input()
  title = 'UsbKey授权列表';
  head_content = '显示所有UsbKey授权列表。';

  ps = 10;
  // 日志列表
  logDataList = [];

  constructor(
    public licenseSer: LicenseService,
    public uKeySer: UsbkeyListService,
    public modal: ShowModalService,
    public listService: ListService,
  ) {
    super();
  }

  // 路由复用时，进入当前页会执行的方法，可以在此调用此页的初始化方法
  _onReuseInit() {
    this.ngOnInit();
  }

  // 当路由复用时，离开当前页会执行的方法，根据需要自行设置
  _onReuseDestroy() {}

  operations: STColumn[] = [
    // {
    //     title: '产品名称',
    //     buttons: [
    //         {
    //             text: '详情',
    //             type: 'none',
    //             format: (record, btn) => {
    //                 return `<span class="text-blue" >详情<span>`
    //             },
    //             click: (record) => {
    //                 this.getContractProduct(record);
    //             },
    //         },
    //     ],
    // },
    // {
    //     title: '产品功能',
    //     buttons: [
    //         {
    //             text: '详情',
    //             type: 'none',
    //             format: (record, btn) => {
    //                 return `<span class="text-blue" >详情<span>`
    //             },
    //             click: (record) => {
    //                 this.getContractProduct(record);
    //             },
    //         },
    //     ],
    // },
    {
      title: '操作',
      buttons: [
        {
          text: '下载license文件',
          type: 'none',
          //popTitle: '确定移出吗？',
          click: record => {
            this.downloadLisence(record);
          },
        },
      ],
      className: 'text-center',
    },
  ];

  columns: STColumn[] = [...LIST_USBKEY_LICENSE_COLUMNS, ...this.operations];

  ngOnInit() {
    // 获取客户列表
    this.getList();
    this.getContractList({});
    // 执行继承对象的ngOnInit方法
    // super.ngOnInit();
  }
  //获取合同列表
  getContractList(param) {
    this.listService
      .getContractList(param)
      .subscribe((res: ApiResToComponent) => {
        if (res) {
          // this.DataList = res.items;
        }
      });
  }
  // async getContractProduct(param){
  //     const groupUserTree: SFSchemaEnumType[] = await this.listService.findGroupTreeList({}).toPromise();
  //     this.modal
  //         .creatStaticModal(Product,
  //             {
  //                 item: param,
  //                 asyncData: () => {
  //                     return new Observable(observer => {
  //                         observer.next(groupUserTree);
  //                         observer.complete();
  //                     });
  //                 },
  //             }, 'lg', {
  //                 nzTitle: `查看[${param.contractName}]相关产品信息`,
  //             })
  //         .subscribe(res => {
  //             if (res) {
  //                 this.getContractList(this.params);
  //             }
  //         });
  // }
  getList() {
    this.uKeySer.getList(this.params).subscribe((res: ApiResToComponent) => {
      if (res) {
        this.logDataList = res.items;
      }
    });
  }
  downloadLisence(record) {
    this.uKeySer
      .downloadLisence({ usbkeyInfoId: record.usbkeyInfoId })
      .subscribe((res: ApiResToComponent) => {
        if (res) {
          const url = res.items.downloadUrl;
          window.location.href = url;
        }
      });
  }

  searchDataGet(e) {
    Object.assign(this.params, e);
    this.getList();
  }
  reSetDataGet() {
    this.params = [];
    this.getList();
  }
  getListDataOfRules(): Observable<ApiResToComponent> {
    throw new Error('Method not implemented.');
  }
  getAllListData(): Observable<ApiResToComponent> {
    throw new Error('Method not implemented.');
  }
}
