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
  templateUrl: './list.memberlink.edit.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListMemberlinkEditComponent extends BaseOfSimpleForm {
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
      links: {
        type: 'array',
        title: '关键信息',
        minItems:0,
        uniqueItems:true,
        maxItems: 16,
        items: {
            type: 'object',
            properties: {
              resuresType:{
                type:'string',
                title:'归属方',
                enum:[{value:'1',label:'甲方'},{value:'2',label:'乙方'}],
                ui: {
                  widget: 'radio',
                },
                default:'1'
              },
              membersName: {
                    type: 'string',
                    title: '姓名',
                    maxLength:20,
                },
              membersPhone:{
                type:'string',
                title:'电话',
                maxLength:12,
                ui:{
                  validator: (
                    value: any,
                    formProperty: FormProperty,
                    form: PropertyGroup,
                  ) => {
                    if(value===null||value===''){
                      return [];
                    }
                    return (/^1[34578]\d{9}$/.test(value)|| /^0\d{2,3}-?\d{7,8}$/.test(value))
                      ? []
                      : [{ keyword: 'telPhone', message: '请输入正确的11位手机号或座机号' }];
                  },
                }
              },
              membersDesc: {
                  type: 'string',
                  title: '描述',
                  maxLength:500,
                  ui: {
                    widget: 'textarea',
                    autosize: { minRows: 2, maxRows: 6 }
                }
              }
            },
            required: [ 'membersName', 'membersPhone','resuresType' ]
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
      return this.listService.addContractLink(value);
  }
}
