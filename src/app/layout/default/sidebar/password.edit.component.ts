import { Component, Input } from '@angular/core';
import { SFSchema, FormProperty, PropertyGroup, SFSchemaEnumType } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { Observable, of } from 'rxjs';
import { BaseOfSimpleForm } from 'app/pages/comm';
import { PasswordDetail } from './interface';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password.edit.component.html',
})
export class PassWordEditComponent extends BaseOfSimpleForm {
  @Input()
  item: any;

  constructor(public NzModal: NzModalRef, private message:NzMessageService,public sidebarService:SidebarService) {
    super(NzModal);
  }

 
  // 表单编辑数据结构
  schema: SFSchema  = {
    
    properties: {
      oldPassWord: {
        type: 'string',
        title: '原密码',
        ui: {
          type:'password',
          placeholder: '请输入客户名',
          grid: {
            span: 24,
          },
        autofocus:true,
        },
        maxLength: 20,
      },
      newPassWord: {
        type: 'string',
        title: '新密码',
        ui: {
          type:'password',
          optionalHelp:"密码长度不小于6个字符，密码需同时包含数字与英文字母,密码中不能含有空格。",
          grid: {
            placeholder: '输入联系电话',
            span: 24,
          }, 
          validator: (
            value: any,
            formProperty: FormProperty,
            form: PropertyGroup,
          ) => {
            if(value===null||value===''){
              return [];
            }
            if(value.length<6){
              return [{keyword:'password',message:'密码长度不能少于6个字符!'}];
            }
            if(/\s/.test(value)){
              return [{keyword:'password',message:'密码中不能包含空格!'}];
            }
            if(!/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/.test(value)){
              return [{keyword:'password',message:'密码必须包含数字和英文字母!'}];
            }
          },
        },
        maxLength: 20,
      },
      repeatPassWord: {
        type: 'string',
        title: '重输密码',
        ui: {
          type:'password',
          placeholder: '请再输入新密码',
           grid: {
             span: 24,
           },
        },
        maxLength: 20,
      },
    },
    required: ['oldPassWord', 'newPassWord','repeatPassWord'],
    ui: {
      spanLabelFixed: 90,
      grid: {
        span: 24,
      },
    },
  };

  // 处理提交的参数
  makeParmas(value: PasswordDetail) {
    return Object.assign(this.item, value);
  }

  // 发送数据到服务器
  sendToServer(value: PasswordDetail): Observable<any> {
      return this.sidebarService.updatePassword(value);
  }
   // 数据提交
   submit(value: any) {
    //判断密码两次是否输入正确
    const oldPassWord = value.oldPassWord;
    const newPassWord = value.newPassWord;
    const repeatPassWord = value.repeatPassWord;
    if(newPassWord!==repeatPassWord){
      this.message.error('两次密码输入不一致!');
      return ;
    }
    if(newPassWord===oldPassWord){
      this.message.error('新旧密码设置重复!');
      return ;
    }
    this.sendParmas(this.makeParmas(value));
  }
}
