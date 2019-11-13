import { Component, Input } from '@angular/core';
import { SFSchema, FormProperty, PropertyGroup, SFSchemaEnumType } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzModalRef } from 'ng-zorro-antd';
import { BaseOfSimpleForm } from '../../comm';
import { Observable, of } from 'rxjs';
import { UserDetial, UserGroupDetial } from './interface';
import { AccountsService } from './accounts.service';
import { EDIT_USERGROUP_SCHEMA } from './schema/edit-group';
@Component({
  selector: 'app-account-edit',
  templateUrl: './account.group.edit.component.html',
  styleUrls: ['./accounts.component.less'],
})
export class AccountGroupEditComponent extends BaseOfSimpleForm {
  @Input()
  item: any;
  @Input()
  asyncData: () => Observable<SFSchemaEnumType[]>;
  constructor(public NzModal: NzModalRef, private accSer: AccountsService) {
    super(NzModal);
  }


  // 表单编辑数据结构
  schema: SFSchema  = {
    properties: {
      groupName: {
        type: 'string',
        title: '分组名称',
        ui: {
          placeholder: '请输入分组名称',
          grid: {
            span: 12,
          },
        },
        maxLength: 20,
      },
      groupCode: {
        type: 'string',
        title: '分组编码',
        ui: {
          placeholder: '请输入分组编码',
          grid: {
            span: 12,
          },
        },
        maxLength: 20,
      },
      parentId: {
        type: 'string',
        title: '父级节点',
        ui: {
          grid: {
            span: 12,
          },
          widget: 'tree-select',
          asyncData:() =>  this.asyncData()
        }
      },
      groupDesc: {
        type: 'string',
        title: '分组描述',
        ui: {
          grid: {
            span: 12,
          },
        },
        maxLength: 200,
      },
      groupSort: {
        type: 'number',
        title: '分组排序',
        ui: {
          grid: {
            span: 12,
          },
        },
        maxLength: 3,
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
    required: ['groupName', 'groupCode'],
    ui: {
      spanLabelFixed: 100,
      grid: {
        span: 24,
      },
    },
  };;

  // 处理提交的参数
  makeParmas(value: UserGroupDetial) {
    return Object.assign(this.item, value);
  }

  // 发送数据到服务器
  sendToServer(value: UserGroupDetial): Observable<any> {
    if (value.groupId == null || value.groupId === '')
      return this.accSer.saveUserGroup(value);
    return this.accSer.updateUserGroup(value);
  }
}
