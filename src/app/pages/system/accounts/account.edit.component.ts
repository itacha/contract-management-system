import { Component, Input } from '@angular/core';
import { SFSchema, FormProperty, PropertyGroup, SFSchemaEnumType } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { BaseOfSimpleForm } from '../../comm';
import { Observable, of } from 'rxjs';
import { UserDetial } from './interface';
import { AccountsService } from './accounts.service';
import { ApiResToComponent } from '../../../basic';
@Component({
  selector: 'app-account-edit',
  templateUrl: './account.edit.component.html',
})
export class AccountEditComponent extends BaseOfSimpleForm {
  @Input()
  item: any;
  @Input()
  asyncData: () => Observable<SFSchemaEnumType[]>;

  constructor(public NzModal: NzModalRef, private accSer: AccountsService,private message:NzMessageService) {
    super(NzModal);
  }

 
  // 表单编辑数据结构
  schema: SFSchema  = {
    properties: {
      loginName: {
        type: 'string',
        title: '登录名',
        ui: {
          placeholder: '请输入登录名',
          grid: {
            span: 12,
          },
        },
        minLength: 5,
        maxLength: 20,
      },
      userName: {
        type: 'string',
        title: '姓名',
        ui: {
          placeholder: '输入姓名',
          grid: {
            span: 12,
          },
        },
        maxLength: 20,
      },
      sex: {
        type: 'string',
        title: '性别',
        enum: [{ label: '男', value: 'male' }, { label: '女', value: 'female' }],
        ui: {
          grid: {
            span: 12,
          },
          widget: 'select',
        },
        //default: 'male',
      },
      mainTelphone: {
        type: 'string',
        title: '联系电话',
        ui: {
          grid: {
            placeholder: '输入联系电话',
            span: 12,
          },
          validator: (
            value: any,
            formProperty: FormProperty,
            form: PropertyGroup,
          ) => {
            if(value===null||value===''){
              return [];
            }
            return /^1[34578]\d{9}$/.test(value)
              ? []
              : [{ keyword: 'telPhone', message: '请输入正确的11位手机号' }];
          },
        },
        maxLength: 11,
      },
      groupId: {
        type: 'string',
        title: '所属分组',
        ui: {
          widget: 'tree-select',
          grid: {
            span: 12,
          },
          asyncData:() =>  this.asyncData()
        },
      },
      roleList:{
        type:'string',
        title:'角色',
        ui:{
          grid: {
            span: 24,
          },
          widget:'checkbox',
          asyncData:() =>  this.accSer.findMenuCheckBoxList(),
        }
      },
      remark: {
        type: 'string',
        title: '备注',
        ui: {
          placeholder: '请输入备注',
          grid: {
            span: 24,
          },
          widget: 'textarea',
          autosize: { minRows: 2, maxRows: 6 },
        },
        maxLength: 400,
      },
    },
    required: ['loginName', 'userName', 'sex','groupId'],
    ui: {
      spanLabelFixed: 100,
      grid: {
        span: 24,
      },
    },
  };

  // 处理提交的参数
  makeParmas(value: UserDetial) {
    value.passWord = null;
    return Object.assign(this.item, value);
  }

  // 发送数据到服务器
  sendToServer(value: UserDetial): Observable<any> {
    //判断机构所属节点不能为根节点
    if(value.groupId === '0'){
      const faleRes:ApiResToComponent = {isComplete:false};
      this.message.create('error','无法在根节点添加用户，请重新选择!');
      return new Observable(observer => {
        observer.next(faleRes);
        observer.complete();
      });
    }
    if (value.userId == null || value.userId === '')
      return this.accSer.saveAccountInfo(value);
    return this.accSer.updateAccountInfo(value);
  }
}
