import { Component, Input } from '@angular/core';
import { SFSchema, FormProperty, PropertyGroup, SFSchemaEnumType } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzModalRef } from 'ng-zorro-antd';
import { BaseOfSimpleForm } from '../../comm';
import { Observable, of } from 'rxjs';
import { ListService } from './list.service';
import { ContractInfoDetial, ContractDetial } from './interface';
@Component({
  selector: 'app-contract-snap-edit-detail',
  templateUrl: './list.snap.edit.component.detail.html',
  styleUrls: ['./list.component.less'],
})
export class ListSnapEditDetailComponent extends BaseOfSimpleForm {
  @Input()
  item: any;

  constructor(public NzModal: NzModalRef, private listService: ListService) {
    super(NzModal);
  }
  totalCount = 1;

  
  
  // 表单编辑数据结构
  schema: SFSchema  = {
    properties: {
      snapshots: {
        type: 'array',
        title: '关键信息',
        minItems:0,
        uniqueItems:true,
        maxItems: this.totalCount,
        items: {
            type: 'object',
            properties: {
              contractDesc: {
                    type: 'string',
                    title: '描述',
                    readOnly:true,
                },
                contractSnapshotCont: {
                    type: 'string',
                    title: '内容',
                    readOnly:true,
                    ui: {
                      widget: 'textarea',
                      autosize: { minRows: 2, maxRows: 6 }
                  }
                }
            },
        },

      },
    },
    ui: {
      removable:false,
      spanLabelFixed: 70,
      grid: {
        span: 24,
        arraySpan:12
      },
    },
  };

  // 处理提交的参数
  makeParmas(value: ContractDetial) {
    
  }

  // 发送数据到服务器
  sendToServer(value: ContractDetial): Observable<any> {
      return this.listService.addContractSnap(value);
  }
}
