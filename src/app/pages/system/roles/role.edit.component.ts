import { Component, Input } from '@angular/core';
import { SFSchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzModalRef } from 'ng-zorro-antd';
import { BaseOfSimpleForm } from '../../comm';
import { Observable } from 'rxjs';
import { RoleDetial } from './interface';
import { RolesService } from './roles.service';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role.edit.component.html',
})
export class RoleEditComponent extends BaseOfSimpleForm {
  @Input()
  item: any;
  apiUrl: string;
  api: any;
  client: any;

  constructor(public NzModal: NzModalRef, public roleSer: RolesService) {
    super(NzModal);
  }

  schema: SFSchema = {
    properties: {
      roleName: {
        type: 'string',
        title: '角色名',
        ui: {
          placeholder: '请输入角色名...',
          grid: {
            span: 12,
          },
        },
        maxLength: 20,
      },
      remark: {
        type: 'string',
        title: '描述',
        ui: {
          placeholder: '请输入角色描述',
          grid: {
            span: 24,
          },
          widget: 'textarea',
          autosize: { minRows: 2, maxRows: 6 },
        },
        maxLength: 200,
      },
    },
    required: ['roleName'],
    ui: {
      spanLabelFixed: 100,
      grid: {
        span: 24,
      },
    },
  };

  // 处理数据格式
  makeParmas(value: any) {
    return Object.assign(this.item, value);
  }

  // 发送数据到服务器
  sendToServer(value: RoleDetial): Observable<any> {
    if (value.roleId == null || value.roleId === '')
      return this.roleSer.saveRoleInfo(value);
    return this.roleSer.updateRoleInfo(value);
  }
}
