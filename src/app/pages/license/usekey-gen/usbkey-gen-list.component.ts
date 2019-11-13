import { Component, OnInit, Input } from '@angular/core';
import { STColumn } from '@delon/abc';
import { BaseOfSimpleTable } from '../../comm';
import { SFSchema, SFSchemaEnumType } from '@delon/form';
import { Observable } from 'rxjs';
import { LicenseService } from '../license.service';
import { LIST_USBKEY_GEN_COLUMNS } from './schema/list-usbkey-gen';
import { SEARCH_USBKEY_GEN_SCHEMA } from './schema/search-usbkey-gen';
import { UsbkeyGenListService } from './usbkey-gen-list.service';
import {
  ApiResToComponent,
  ShowModalService,
  CommDataService,
} from 'app/basic';
import { AuthComponent } from './usbkey-gen-do.component';
import { RefuseComponent } from './usbkey-gen-refuse.component';
import { ListService } from 'app/pages/contract/list/list.service';
import { ListDetailComponent } from 'app/pages/contract/list/list.detail.component';
import { USBKeyGenListDetailComponent } from './usbkey-gen-list.detail.component';
// import { ProductDetailComponent } from '../../contract/list/product.detail.component'

@Component({
  selector: 'app-usbkey-gen-page',
  templateUrl: './usbkey-gen-list.component.html',
  styleUrls: ['./usbkey-gen-list.component.less'],
})
export class UsbkeyGenListPageComponent extends BaseOfSimpleTable
  implements OnInit {
  defaultDataRules: any;

  params = [];
  searchSchema: SFSchema = SEARCH_USBKEY_GEN_SCHEMA;

  scroll = { x: '900px' };

  condition: any = {};

  @Input()
  title = 'UsbKey生成列表';
  head_content = '显示所有UsbKey生成列表。';

  ps = 10;
  // 日志列表
  logDataList = [];

  constructor(
    public licenseSer: LicenseService,
    public uKeySer: UsbkeyGenListService,
    public model: ShowModalService,
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
    {
      title: '产品名称',
      index: 'contractProduct.name',
      className: 'text-center',
      width: '10%',
    },
    {
      title: '产品功能',
      index: 'contractProduct.json',
      className: 'text-center',
      width: '10%',
      format: function(cell: any, row: any) {
        let carContent = '';
        if (cell.productFunctions) {
          if (cell.productFunctions.length >= 30) {
            carContent = cell.productFunctions.substring(0, 30) + '...';
          } else {
            carContent = cell.productFunctions;
          }
        }
        return carContent;
      },
    },
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
          text: '详情',
          type: 'none',
          click: record => {
            this.gotoVerifyContract(record);
          },
        },
        {
          text: '生成',
          type: 'none',
          click: record => {
            this.genLisence(record);
          },
        },
        {
          text: '拒绝',
          type: 'none',
          //popTitle: '确定移出吗？',
          click: record => {
            this.refuseLisence(record);
          },
        },
      ],
      className: 'text-center',
    },
  ];

  columns: STColumn[] = [...LIST_USBKEY_GEN_COLUMNS, ...this.operations];

  ngOnInit() {
    // 获取客户列表
    this.getList();
    // 执行继承对象的ngOnInit方法
    // super.ngOnInit();
    this.getContractList({});
  }
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
  //     this.model
  //         .creatStaticModal(ProductDetailComponent,
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
  // 查看详情
  async gotoVerifyContract(param) {
    console.log(param,'cccccccc')
    const groupUserTree: SFSchemaEnumType[] = await this.listService
      .findGroupTreeList({})
      .toPromise();
    this.model
      .creatStaticModal(
        USBKeyGenListDetailComponent,
        {
          item: param,
          asyncData: () => {
            return new Observable(observer => {
              observer.next(groupUserTree);
              observer.complete();
            });
          },
        },
        'lg',
        {
          nzTitle: `查看[${param.contractName}]的信息`,
        },
      )
      .subscribe(res => {
        if (res) {
          this.getList();
        }
      });
  }
  getList() {
    Object.assign(this.params, {
      applyStatus: 1,
      verifyStatus: 1,
      type: 'auth',
    });
    this.uKeySer.getList(this.params).subscribe((res: ApiResToComponent) => {
      if (res) {
        this.logDataList = res.items;
      }
    });
  }
  genLisence(record) {
    console.log(record);
    this.model
      .creatStaticModal(AuthComponent, { params: record }, 'md', {
        nzTitle: `[${record.contractProduct.name}]-UsbKey生成`,
      })
      .subscribe(res => {
        if (res) {
          //弹框数据提交完毕之后关闭弹框，此页面的后续操作
          this.getList();
        }
      });
  }

  refuseLisence(record) {
    console.log(record);
    this.model
      .creatStaticModal(RefuseComponent, { params: record }, 'md', {
        nzTitle: 'UsbKey生成拒绝',
      })
      .subscribe(res => {
        if (res) {
          //弹框数据提交完毕之后关闭弹框，此页面的后续操作
          this.getList();
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
