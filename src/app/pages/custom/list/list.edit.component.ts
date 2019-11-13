import { Component, Input } from '@angular/core';
import { SFSchema, FormProperty, PropertyGroup, SFSchemaEnumType } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { BaseOfSimpleForm } from '../../comm';
import { Observable, of } from 'rxjs';
import { CustomerDetial } from './interface';
import { ListService } from './list.service';
import { LIST_EDIT_CUSTOM_COLUMNS } from './schema/list-edit-custom';
@Component({
  selector: 'app-customer-list-edit',
  templateUrl: './list.edit.component.html',
})
export class ListEditComponent extends BaseOfSimpleForm {
  @Input()
  item: any;

  constructor(public NzModal: NzModalRef, private message:NzMessageService,private listService:ListService) {
    super(NzModal);
  }

 
  // 表单编辑数据结构
  schema: SFSchema  = LIST_EDIT_CUSTOM_COLUMNS;

  // 处理提交的参数
  makeParmas(value: CustomerDetial) {
    return Object.assign(this.item, value);
  }

  // 发送数据到服务器
  sendToServer(value: CustomerDetial): Observable<any> {
    if (value.customerId == null || value.customerId === '')
      return this.listService.addCustomer(value);
    return this.listService.updateCustomer(value);
  }
}
