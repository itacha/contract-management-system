import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { STColumn, STColumnButton } from '@delon/abc';
import { BaseOfSimpleTable } from '../../comm';
import { ApiResToComponent, ShowModalService } from 'app/basic';
import { SFSchema, SFSchemaEnumType } from '@delon/form';
import { Observable, iif } from 'rxjs';
import { ContractService } from '../contract.service';
import { LIST_CONTRACT_COLUMNS } from '../list/schema/list-contract';
import { SEARCH_VERIFY_CONTRACT_SCHEMA } from '../list/schema/search-verify-contract';
import { VerifyService } from './verify.service';
import { ListService } from '../list/list.service';
import { VerifyEditComponent } from './verify.edit.component';
import { LIST_VERIFY_CONTRACT_COLUMNS } from '../list/schema/list-verify-contract';
import { NzTabSetComponent, NzModalService } from 'ng-zorro-antd';
import { ListDetailComponent } from '../list/list.detail.component';
import { ProductDetailComponent } from '../list/product.detail.component';

@Component({
  selector: 'app-contract-verify-page',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.less'],
})
export class VerifyPageComponent extends BaseOfSimpleTable implements OnInit {
  @ViewChild('tabset') tabset: NzTabSetComponent;
  functionList = [];

  defaultDataRules: any;

  params: any = {};
  searchSchema: SFSchema = SEARCH_VERIFY_CONTRACT_SCHEMA;

  scroll = { x: '900px' };

  @Input()
  title = '合同审核';
  head_content = '显示所有待审核的合同信息。';

  ps = 10;
  // 审核列表
  DataList = [];

  constructor(
    private modalService: NzModalService,
    public contractSer: ContractService,
    public verifyService: VerifyService,
    public modal: ShowModalService,
    public listService: ListService,
  ) {
    super();
  }

  // 路由复用时，进入当前页会执行的方法，可以在此调用此页的初始化方法
  _onReuseInit() {
    // 获取客户列表
    Object.assign(this.params, { verifyStatus: this.tabset.nzSelectedIndex });
    this.getVerifyContractList(this.params);
  }

  // 当路由复用时，离开当前页会执行的方法，根据需要自行设置
  _onReuseDestroy() {}

  operations: STColumn[] = [
    {
      title: '产品信息',
      buttons: [
        {
          text: '详情',
          type: 'none',
          format: (record, btn) => {
            return `<span class="text-blue" >详情<span>`;
          },
          click: (record, tplContent) => {
            this.getContractProduct(record, tplContent);
          },
        },
      ],
    },
    // {
    //   title: '产品功能',
    //   buttons: [
    //     {
    //       text: '详情',
    //       type: 'none',
    //       format: (record, btn) => {
    //         return `<span class="text-blue" >详情<span>`;
    //       },
    //       click: (record, tplContent) => {
    //         this.getContractProduct(record, tplContent);
    //       },
    //     },
    //   ],
    // },
    {
      title: '操作',
      className: 'text-center',
      buttons: [
        {
          text: '审核',
          type: 'none',
          click: record => {
            this.gotoVerifyContract(record);
          },
          iif: (item: any, btn: STColumnButton, column: STColumn) => {
            if (this.tabset.nzSelectedIndex == 1) {
              return false;
            }
            return true;
          },
        },
        {
          text: '详情',
          type: 'none',
          format: () => `<span class="text-blue">详情</span>`,
          click: (record: any) => {
            this.gotoVerifyContract1(record);
          },
        },
      ],
    },
  ];

  columns: STColumn[] = [...LIST_VERIFY_CONTRACT_COLUMNS, ...this.operations];

  ngOnInit() {
    // 获取客户列表
    Object.assign(this.params, { verifyStatus: 0 });
    this.getVerifyContractList(this.params);
    this.getContractList({});
  }
  getContractList(param) {
    this.listService
      .getContractList(param)
      .subscribe((res: ApiResToComponent) => {
        if (res) {
          this.DataList = res.items;
        }
      });
  }
  async getContractProduct(param, tplContent: TemplateRef<{}>) {
    const groupUserTree: SFSchemaEnumType[] = await this.listService
      .findGroupTreeList({})
      .toPromise();
    this.modal
      .creatStaticModal(
        ProductDetailComponent,
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
          nzTitle: `查看[${param.contractName}]相关产品信息`,
        },
      )
      .subscribe(res => {
        if (res) {
          this.getContractList(this.params);
        }
      });
  }
  getVerifyContractList(param) {
    this.verifyService
      .getVerifyContractList(param)
      .subscribe((res: ApiResToComponent) => {
        if (res) {
          this.DataList = res.items;
        }
      });
  }
  // 条件搜索
  searchDataGet(event) {
    this.params = event;
    this.getVerifyContractList(this.params);
  }
  // 重置查询条件
  reSetDataGet(param) {
    this.params = {};
    this.getVerifyContractList(this.params);
  }

  // 进入修改合同页面
  async gotoVerifyContract(param) {
    const groupUserTree: SFSchemaEnumType[] = await this.listService
      .findGroupTreeList({})
      .toPromise();
    this.modal
      .creatStaticModal(
        VerifyEditComponent,
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
          nzTitle: `审核[${param.contractName}]的信息`,
        },
      )
      .subscribe(res => {
        if (res) {
          this.getVerifyContractList(this.params);
        }
      });
  }

  getListDataOfRules(): Observable<ApiResToComponent> {
    throw new Error('Method not implemented.');
  }
  getAllListData(): Observable<ApiResToComponent> {
    throw new Error('Method not implemented.');
  }
  change(e: any) {
    Object.assign(this.params, { verifyStatus: e.index });
    this.getVerifyContractList(this.params);
  }

  // 查看详情
  async gotoVerifyContract1(param) {
    const groupUserTree: SFSchemaEnumType[] = await this.listService
      .findGroupTreeList({})
      .toPromise();
    this.modal
      .creatModal(
        ListDetailComponent,
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
        }
      });
  }
}
