import { Component, Input } from '@angular/core';
import { SFSchema, FormProperty, PropertyGroup, SFSchemaEnumType } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { BaseOfSimpleForm } from '../../comm';
import { Observable, of } from 'rxjs';
import { CustomerDetial } from '../list/interface';
import { VERIFY_EDIT_CUSTOM_COLUMNS } from '../list/schema/verify-edit-custom';
import { VerifyService } from './verify.service';
@Component({
  selector: 'app-verify-customer-list-edit',
  templateUrl: './verify.edit.component.html',
})
export class VerifyEditComponent extends BaseOfSimpleForm {
  @Input()
  item: any;

  constructor(public NzModal: NzModalRef, private message:NzMessageService,private verifyService:VerifyService) {
    super(NzModal);
  }

 
  // 表单编辑数据结构
  schema: SFSchema  = VERIFY_EDIT_CUSTOM_COLUMNS;

  // 处理提交的参数
  makeParmas(value: CustomerDetial) {
    return Object.assign(this.item, value);
  }
 // 数据提交
 submit(value: any) {
  // 判断是否选择审核意见
  const verifyStatus = value.verifyStatus;
  if(  verifyStatus === '0') {
    this.message.error('未选择审核状态,请选择后再提交!');
    return ;
   }

   this.sendParmas(this.makeParmas(value));
}
  // 发送数据到服务器
  sendToServer(value: CustomerDetial): Observable<any> {
      return this.verifyService.verifyCustomer(value);
  }
}
