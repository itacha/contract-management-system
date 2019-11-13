import { Component, Input } from '@angular/core';
import {
  SFSchema,
  FormProperty,
  PropertyGroup,
  SFSchemaEnumType,
  SFSchemaEnum,
} from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzModalRef, NzMessageService, UploadFile } from 'ng-zorro-antd';
import { BaseOfSimpleForm } from '../../comm';
import { Observable, of } from 'rxjs';
import { VerifyService } from './verify.service';
import { ContractDetial } from '../list/interface';
import { ListService } from '../list/list.service';
@Component({
  selector: 'app-contract-verify-list-edit',
  templateUrl: './verify.edit.component.html',
})
export class VerifyEditComponent extends BaseOfSimpleForm {
  @Input()
  item: any;
  @Input()
  asyncData: () => Observable<SFSchemaEnumType[]>;
  // 附件列表
  fileList: UploadFile[] = [];
  profileList: UploadFile[] = [];
  //合同关联产品
  productList: any;
  profileList1s: { [key: string]: UploadFile[] } = {};

  constructor(
    public NzModal: NzModalRef,
    private message: NzMessageService,
    public verifyService: VerifyService,
    public listService: ListService,
  ) {
    super(NzModal);
  }
  schema: SFSchema;
  // 快照数量
  snapTotalCount;
  // 跟踪人员数量
  linkTotalCount;
  // 维护信息数量
  infoTotalCount;

  //hidden时间
  hiddenTime: boolean;
  hiddenSnap: boolean;
  hiddenLink: boolean;
  hiddenInfo: boolean;
  ngOnInit() {
    this.loadMore();
    // 获取文件
    this.listService
      .getContractAttachmentList({ contractId: this.item.contractId })
      .subscribe(res => {
        this.fileList = res;
        this.profileList = res;
        this.profileList = this.profileList.filter(e => {
          return e.productId !== '0';
        });
        this.fileList = this.fileList.filter(e => {
          return e.productId == '0';
        });
      });
    //获取合同关联产品信息
    this.listService
      .getContractProduct({ contractId: this.item.contractId })
      .subscribe(res => {
        this.productList = res.items;
        this.productList.json = this.productList.forEach(e => {
          let newObj = JSON.parse(e.json);
          let newStr = '';
          for (const key in newObj) {
            newStr = newObj[key] + '、' + newStr;
          }
          e.json = newStr.slice(0, newStr.length - 1);
        });
      });
    this.infoTotalCount = this.item.infos.length;
    this.snapTotalCount = this.item.snapshots.length;
    this.linkTotalCount = this.item.links.length;
    if (this.infoTotalCount < 1) {
      this.infoTotalCount = 1;
      this.hiddenInfo = true;
    } else {
      this.hiddenInfo = false;
    }
    if (this.snapTotalCount < 1) {
      this.snapTotalCount = 1;
      this.hiddenSnap = true;
    } else {
      this.hiddenSnap = false;
    }
    if (this.linkTotalCount < 1) {
      this.linkTotalCount = 1;
      this.hiddenLink = true;
    } else {
      this.hiddenLink = false;
    }
    if (this.item.periodType == '1') {
      this.hiddenTime = false;
    } else {
      this.hiddenTime = true;
    }

    // 表单编辑数据结构
    this.schema = {
      properties: {
        contractName: {
          type: 'string',
          title: '合同名称',
          ui: {
            grid: {
              span: 24,
            },
          },
          maxLength: 200,
          readOnly: true,
        },
        contractNum: {
          type: 'string',
          title: '合同编号',
          ui: {
            grid: {
              span: 12,
            },
          },
          maxLength: 40,
          readOnly: true,
        },
        contractAmount: {
          type: 'string',
          title: '合同金额（元）',
          ui: {
            addOnAfter: 'RMB',
            grid: {
              span: 12,
            },
          },
          readOnly: true,
        },
        customerId: {
          type: 'string',
          title: '合同甲方',
          ui: {
            widget: 'select',
            grid: {
              span: 24,
            },
            asyncData: () => this.listService.findCustomerSelectList({}),
          },
          readOnly: true,
        },
        userName: {
          type: 'string',
          title: '乙方联系人',
          ui: {
            grid: {
              span: 24,
            },
            widget: 'cascader',
            asyncData: () => this.asyncData(),
          },
          readOnly: true,
        },
        // productName: {
        //   type: 'string',
        //   title: '产品名称',
        //   ui: {
        //     grid: {
        //       span: 12,
        //     },
        //   },
        //   readOnly: true,
        // },
        // periodType: {
        //   type: 'string',
        //   title: '期限类型',
        //   enum: [
        //     { label: '永久', value: '0' },
        //     { label: '时间段', value: '1' },
        //   ],
        //   ui: {
        //     widget: 'select',
        //     grid: {
        //       span: 12,
        //     },
        //   },
        //   readOnly: true,
        // },
        // productFunctions: {
        //   type: 'string',
        //   title: '产品功能',
        //   ui: {
        //     grid: {
        //       span: 24,
        //     },
        //   },
        //   readOnly: true,
        // },
        // startTime: {
        //   type: 'string',
        //   title: '授权期限',
        //   ui: {
        //     hidden: this.hiddenTime,
        //     widget: 'date',
        //     end: 'endTime',
        //     grid: {
        //       span: 24,
        //     },
        //   },
        //   readOnly: true,
        // },
        // endTime: {
        //   type: 'string',
        //   ui: {
        //     widget: 'date',
        //   },
        // },
        snapshots: {
          type: 'array',
          title: '快照信息',
          uniqueItems: true,
          minItems: 0,
          maxItems: this.snapTotalCount,
          items: {
            type: 'object',
            properties: {
              contractDesc: {
                type: 'string',
                title: '描述',
                readOnly: true,
              },
              contractSnapshotCont: {
                type: 'string',
                title: '内容',
                readOnly: true,
                ui: {
                  widget: 'textarea',
                  autosize: { minRows: 2, maxRows: 6 },
                },
              },
            },
          },
          ui: {
            hidden: this.hiddenSnap,
          },
        },
        infos: {
          type: 'array',
          title: '补充信息',
          minItems: 0,
          uniqueItems: true,
          maxItems: this.infoTotalCount,
          items: {
            type: 'object',
            properties: {
              contractInfoLable: {
                type: 'string',
                title: '描述',
                readOnly: true,
              },
              contractInfoValue: {
                type: 'string',
                title: '内容',
                readOnly: true,
                ui: {
                  widget: 'textarea',
                  autosize: { minRows: 2, maxRows: 6 },
                },
              },
            },
          },
          ui: {
            hidden: this.hiddenInfo,
          },
        },
        links: {
          type: 'array',
          title: '跟踪人员',
          minItems: 0,
          uniqueItems: true,
          maxItems: this.linkTotalCount,
          items: {
            type: 'object',
            properties: {
              resuresType: {
                type: 'string',
                title: '归属方',
                readOnly: true,
                enum: [
                  { value: '1', label: '甲方' },
                  { value: '2', label: '乙方' },
                ],
                ui: {
                  widget: 'radio',
                },
              },
              membersName: {
                type: 'string',
                title: '姓名',
                readOnly: true,
              },
              membersPhone: {
                type: 'string',
                title: '电话',
                readOnly: true,
              },
              membersDesc: {
                type: 'string',
                title: '描述',
                readOnly: true,
                ui: {
                  widget: 'textarea',
                  autosize: { minRows: 2, maxRows: 6 },
                },
              },
            },
          },
          ui: {
            hidden: this.hiddenLink,
          },
        },
        remark: {
          type: 'string',
          title: '备注',
          ui: {
            grid: {
              span: 24,
            },
            widget: 'textarea',
            autosize: { minRows: 2, maxRows: 6 },
          },
          maxLength: 400,
          readOnly: true,
        },
        verifyStatus: {
          type: 'string',
          title: '审核状态',
          enum: [
            { label: '通过', value: '1' },
            { label: '不通过', value: '2' },
          ],
          ui: {
            widget: 'radio',
            styleType: 'button',
            change: console.log,
          },
        },
        auditOpinion: {
          type: 'string',
          title: '审核意见',
          ui: {
            grid: {
              span: 24,
            },
            widget: 'textarea',
            autosize: { minRows: 1, maxRows: 2 },
          },
          maxLength: 400,
          // readOnly: true
        },
      },
      required: ['verifyStatus', 'verifyView'],
      ui: {
        spanLabelFixed: 100,
        removable: false,
        grid: {
          span: 24,
          arraySpan: 12,
        },
      },
      if: {
        properties: { verifyStatus: { enum: ['2'] } },
      },
      then: {
        required: ['auditOpinion'],
      },
    };
  }
  loadMore(): void {
    this.listService.findProductList2({}).subscribe(data => {
      this.initFiles(data);
    });
  }
  // 附件基础初始化
  initFiles(data: any) {
    data.forEach((element: any) => {
      this.profileList1s[element.id] = [];
    });
    // 获取文件
    this.listService
      .getContractAttachmentList({ contractId: this.item.contractId })
      .subscribe(res => {
        res.forEach((file: any) => {
          if (file.productId == '0') {
            this.fileList.push(file);
          } else {
            this.profileList1s[file.productId].push(file);
          }
        });
        console.log(this.profileList1s);
      });
  }
  // 处理提交的参数
  makeParmas(value: ContractDetial) {
    return Object.assign(this.item, value);
  }
  // 数据提交
  submit(value: any) {
    // 判断是否选择审核意见
    const verifyStatus = value.verifyStatus;
    if (verifyStatus === '0') {
      this.message.error('未选择审核状态,请选择后再提交!');
      return;
    }

    this.sendParmas(this.makeParmas(value));
  }
  // 发送数据到服务器
  sendToServer(value: ContractDetial): Observable<any> {
    return this.verifyService.verifyContract(value);
  }
}
