import { Component, Input } from '@angular/core';
import { SFSchema, FormProperty, PropertyGroup, SFSchemaEnumType } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzModalRef } from 'ng-zorro-antd';
import { BaseOfSimpleForm } from '../../comm';
import { Observable, of } from 'rxjs';
import { ListService } from './list.service';
import { ContractInfoDetial, ContractDetial } from './interface';
@Component({
  selector: 'app-contract-info-edit',
  templateUrl: './list.info.edit.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListInfoEditComponent extends BaseOfSimpleForm {
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
      infos: {
        type: 'array',
        title: '关键信息',
        minItems:0,
        uniqueItems:true,
        maxItems: 16,
        items: {
            type: 'object',
            properties: {
              contractInfoLable: {
                    type: 'string',
                    title: '描述',
                    maxLength:40,
                },
                contractInfoValue: {
                    type: 'string',
                    title: '内容',
                    maxLength:500,
                    ui: {
                      widget: 'textarea',
                      autosize: { minRows: 2, maxRows: 6 }
                  }
                }
            },
            required: [ 'contractInfoLable', 'contractInfoValue' ]
        },

      },
    },
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
      return this.listService.addContractInfoList(value);
  }
}
