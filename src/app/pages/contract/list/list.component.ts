import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { STColumn } from '@delon/abc';
import { BaseOfSimpleTable } from '../../comm';
import { ApiResToComponent, ShowModalService } from 'app/basic';
import { SFSchema, SFSchemaEnumType } from '@delon/form';
import { Observable } from 'rxjs';
import { SEARCH_CONTRACT_SCHEMA } from './schema/search-contract';
import { LIST_CONTRACT_COLUMNS } from './schema/list-contract';
import { ContractService } from '../contract.service';
import { ListService } from './list.service';
import { ListEditComponent } from './list.edit.component';
import { ListInfoEditComponent } from './list.info.edit.component';
import { ListSnapEditComponent } from './list.snap.edit.component';
import { ListSnapEditDetailComponent } from './list.snap.edit.component.detail';
import { ListInfoEditDetailComponent } from './list.info.edit.component.detail';
import { ListMemberlinkEditComponent } from './list.memberlink.edit.component';
import { ListMemberlinkEditDetailComponent } from './list.memberlink.edit.component.detail';
import { ContractDetial } from './interface';
import { ListDetailComponent } from './list.detail.component';
import { ProductDetailComponent } from './product.detail.component';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-contract-list-page',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListPageComponent extends BaseOfSimpleTable implements OnInit {
  defaultDataRules: any;

  params: any = {};
  searchSchema: SFSchema = SEARCH_CONTRACT_SCHEMA;

  scroll = { x: '900px' };

  @Input()
  title = '合同列表';
  head_content = '显示所有合同的信息。';

  ps = 10;
  // 数据列表
  DataList = [];
  functionList = [];

  constructor(
    public contractSer: ContractService,
    public listService: ListService,
    public modal: ShowModalService,
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
      title: '产品信息',
      buttons: [
        {
          text: '详情',
          type: 'none',
          format: (record, btn) => {
            return `<span class="text-blue" >详情<span>`;
          },
          click: record => {
            this.getContractProduct(record);
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
    //       click: record => {
    //         this.getContractProduct(record);
    //       },
    //     },
    //   ],
    // },
    {
      title: '合同快照',
      buttons: [
        {
          text: '点击新增',
          type: 'none',
          format: (record, btn) => {
            if (record.verifyStatus !== '0') {
              if (record.snapshots.length > 0) {
                return `点击查看`;
              } else {
                return `<span class="text-grey" >无<span>`;
              }
            } else {
              return `点击新增`;
            }
          },
          click: record => {
            if (
              record.verifyStatus === '0' ||
              (record.verifyStatus != '0' && record.snapshots.length > 0)
            ) {
              this.togoContractSnapEdit(record);
            }
          },
        },
      ],
      className: 'text-center',
    },
    {
      title: '跟踪人员',
      buttons: [
        {
          text: '点击新增',
          type: 'none',
          format: (record, btn) => {
            if (record.verifyStatus !== '0') {
              if (record.links.length > 0) {
                return `点击查看`;
              } else {
                return `<span class="text-grey" >无<span>`;
              }
            } else {
              return `点击新增`;
            }
          },
          click: record => {
            if (
              record.verifyStatus === '0' ||
              (record.verifyStatus != '0' && record.links.length > 0)
            ) {
              this.togoContractMemberLinkEdit(record);
            }
          },
        },
      ],
      className: 'text-center',
    },

    {
      title: '补充信息',
      buttons: [
        {
          text: '点击新增',
          type: 'none',
          format: (record, btn) => {
            if (record.verifyStatus !== '0') {
              if (record.infos.length > 0) {
                return `点击查看`;
              } else {
                return `<span class="text-grey" >无<span>`;
              }
            } else {
              return `点击新增`;
            }
          },
          click: record => {
            if (
              record.verifyStatus === '0' ||
              (record.verifyStatus != '0' && record.infos.length > 0)
            ) {
              this.togoContractInfoEdit(record);
            }
          },
        },
      ],
      className: 'text-center',
    },
    {
      title: '操作区',
      buttons: [
        {
          text: '详情',
          type: 'none',
          format: () => `<span class="text-blue">详情</span>`,
          click: (record: any) => {
            this.gotoVerifyContract(record);
          },
        },
        {
          text: '申请Ukey',
          type: 'del',
          popTitle: '确定申请生成USBKey吗？',
          iif: (record: any) => {
            if (record.verifyStatus === '1' && record.applyStatus === '0') {
              return true;
            }
          },
          format: () => `<span class="text-green">申请Ukey</span>`,
          click: (record: any) => {
            this.applyContract(record);
          },
        },
        {
          text: '更多',
          type: 'none',
          iif: (record: any) => {
            if (
              record.applyStatus === '0' ||
              record.applyStatus === '3' ||
              (record.verifyStatus === '1' && record.applyStatus === '0')
            ) {
              return true;
            }
          },

          children: [
            {
              text: '修改合同',
              type: 'none',
              iif: (record: any) => {
                if (record.applyStatus === '0' || record.applyStatus === '3') {
                  return true;
                }
              },
              click: (record: any) => {
                this.updateContract(record);
              },
            },
            // {
            //     text: '申请Ukey',
            //     type: 'del',
            //     popTitle: '确定申请生成USBKey吗？',
            //     iif: (record: any) => {
            //         if (record.verifyStatus === '1' && record.applyStatus === '0') {
            //             return true;
            //         }
            //     },
            //     format: () => `<span class="text-green">申请Ukey</span>`,
            //     click: (record: any) => {
            //         this.applyContract(record);
            //     },
            // },
            {
              text: '删除合同',
              type: 'del',
              iif: (record: any) => {
                if (record.applyStatus === '0' || record.applyStatus === '3') {
                  return true;
                }
              },
              popTitle: '删除后数据无法恢复，确定删除吗？',
              format: () => `<span class="text-error">删除合同</span>`,
              click: (record: any) => {
                this.deleteContract(record.contractId);
              },
            },
          ],
        },
      ],
      className: 'text-center',
    },
  ];

  columns: STColumn[] = [...LIST_CONTRACT_COLUMNS, ...this.operations];

  ngOnInit() {
    // 获取合同列表
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
          this.DataList = res.items;
        }
      });
  }
  async getContractProduct(param) {
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
  //条件搜索
  searchDataGet(event) {
    this.params = event;
    this.getContractList(this.params);
  }
  //重置查询条件
  reSetDataGet(param) {
    this.params = {};
    this.getContractList(this.params);
  }

  //删除合同
  deleteContract(id: string) {
    const deleteParam = { contractId: id };
    if (id != null && id !== '') {
      this.listService
        .deleteContract(deleteParam)
        .subscribe((res: ApiResToComponent) => {
          if (res) {
            this.getContractList(this.params);
          }
        });
    }
  }
  //申请生成ukey
  applyContract(param: ContractDetial) {
    this.listService.applyUsbkey(param).subscribe((res: ApiResToComponent) => {
      if (res) {
        this.getContractList(this.params);
      }
    });
  }

  //进入修改合同页面
  async updateContract(param) {
    const groupUserTree: SFSchemaEnumType[] = await this.listService
      .findGroupTreeList({})
      .toPromise();
    this.modal
      .creatStaticModal(
        ListEditComponent,
        {
          item: param,
          asyncData: () => {
            return new Observable(observer => {
              observer.next(groupUserTree);
              observer.complete();
            });
          },
        },
        'md',
        {
          nzTitle: `编辑[${param.contractName}]的信息`,
          nzOnCancel: (m: ListEditComponent) => {
            m.newReset();
          },
        },
      )
      .subscribe(res => {
        if (res) {
          this.getContractList(this.params);
        }
      });
  }
  //进入新增合同页面
  async addContract() {
    // alert('click')
    const groupUserTree: SFSchemaEnumType[] = await this.listService
      .findGroupTreeList({})
      .toPromise();
    this.modal
      .creatStaticModal(
        ListEditComponent,
        {
          item: {},
          asyncData: () => {
            return new Observable(observer => {
              observer.next(groupUserTree);
              observer.complete();
            });
          },
        },
        'md',
        {
          nzTitle: '新增合同信息',
          // nzOnCancel: (m: ListEditComponent) => {
          //     m.newReset();
          // }
        },
      )
      .subscribe(res => {
        if (res) {
          this.getContractList(this.params);
        }
      });
  }
  //进入信息维护页面
  togoContractInfoEdit(param) {
    if (param.verifyStatus === '0') {
      this.modal
        .creatStaticModal(ListInfoEditComponent, { item: param }, 'lg', {
          nzTitle: `编辑[${param.contractName}]的补充信息`,
        })
        .subscribe(res => {
          if (res) {
            this.getContractList(this.params);
          }
        });
    } else {
      this.modal
        .creatStaticModal(ListInfoEditDetailComponent, { item: param }, 'lg', {
          nzTitle: `查看[${param.contractName}]的补充信息`,
        })
        .subscribe(res => {
          if (res) {
            this.getContractList(this.params);
          }
        });
    }
  }
  //进入快照信息
  togoContractSnapEdit(param) {
    if (param.verifyStatus === '0') {
      this.modal
        .creatStaticModal(ListSnapEditComponent, { item: param }, 'lg', {
          nzTitle: `编辑[${param.contractName}]的快照信息`,
        })
        .subscribe(res => {
          if (res) {
            this.getContractList(this.params);
          }
        });
    } else {
      this.modal
        .creatStaticModal(ListSnapEditDetailComponent, { item: param }, 'lg', {
          nzTitle: `查看[${param.contractName}]的快照信息`,
        })
        .subscribe(res => {
          if (res) {
            this.getContractList(this.params);
          }
        });
    }
  }

  //进入跟踪人员信息
  togoContractMemberLinkEdit(param) {
    if (param.verifyStatus === '0') {
      this.modal
        .creatStaticModal(ListMemberlinkEditComponent, { item: param }, 'lg', {
          nzTitle: `编辑[${param.contractName}]的跟踪人员信息`,
        })
        .subscribe(res => {
          if (res) {
            this.getContractList(this.params);
          }
        });
    } else {
      this.modal
        .creatStaticModal(
          ListMemberlinkEditDetailComponent,
          { item: param },
          'lg',
          {
            nzTitle: `查看[${param.contractName}]的跟踪人员信息`,
          },
        )
        .subscribe(res => {
          if (res) {
            this.getContractList(this.params);
          }
        });
    }
  }
  // 查看详情
  async gotoVerifyContract(param) {
    const groupUserTree: SFSchemaEnumType[] = await this.listService
      .findGroupTreeList({})
      .toPromise();
    this.modal
      .creatStaticModal(
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
          this.getContractList(this.params);
        }
      });
  }
  getListDataOfRules(): Observable<ApiResToComponent> {
    throw new Error('Method not implemented.');
  }
  getAllListData(): Observable<ApiResToComponent> {
    throw new Error('Method not implemented.');
  }
}
