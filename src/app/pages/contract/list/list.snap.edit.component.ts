import { Component, Input } from '@angular/core';
import { SFSchema, FormProperty, PropertyGroup, SFSchemaEnumType } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzModalRef } from 'ng-zorro-antd';
import { BaseOfSimpleForm } from '../../comm';
import { Observable, of } from 'rxjs';
import { ListService } from './list.service';
import { ContractInfoDetial, ContractDetial } from './interface';
@Component({
  selector: 'app-contract-snap-edit',
  templateUrl: './list.snap.edit.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListSnapEditComponent extends BaseOfSimpleForm {
  @Input()
  item: any;
  @Input()
  asyncData: () => Observable<SFSchemaEnumType[]>;
  constructor(public NzModal: NzModalRef, private listService: ListService) {
    super(NzModal);
  }


  // 表单编辑数据结构
  schema: SFSchema  = {
    properties: {
      snapshots: {
        type: 'array',
        title: '关键信息',
        minItems: 0,
        uniqueItems: true,
        maxItems: 16,
        items: {
            type: 'object',
            properties: {
              contractDesc: {
                    type: 'string',
                    title: '描述',
                    maxLength:40,
                },
                contractSnapshotCont: {
                    type: 'string',
                    title: '内容',
                    maxLength:500,
                    ui: {
                      widget: 'textarea',
                      autosize: { minRows: 2, maxRows: 6 }
                  },
                },
                
            },
          required: [ 'contractDesc', 'contractSnapshotCont' ],
        },

      },
    },
    required: ['snapshots'],
    ui: {
      spanLabelFixed: 70,
      grid: {
        span: 24,
        arraySpan:12
      },
    },
  };

  // 处理提交的参数
  makeParmas(value: ContractDetial) {
    return Object.assign(this.item, value);
  }

  // 发送数据到服务器
  sendToServer(value: ContractDetial): Observable<any> {
      return this.listService.addContractSnap(value);
  }
}
