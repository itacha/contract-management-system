import { OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResToComponent } from 'app/basic';
import { NzModalRef } from 'ng-zorro-antd';
import { SFSchema } from '@delon/form';

/**
 * 基础表单控件
 */
@Injectable()
export abstract class BaseOfSimpleForm implements OnInit {
  constructor(protected NzModal: NzModalRef) {}
  // 请求数据的参数

  // 表单正在提交
  loading = false;

  ngOnInit() {}

  // 动态表单数据源组件
  abstract schema: SFSchema;

  // 数据提交
  submit(value: any) {
    this.sendParmas(this.makeParmas(value));
  }

  // 处理参数
  abstract makeParmas(value: any): any;

  // API请求方法
  abstract sendToServer(value: any): Observable<any>;

  // 数据提交
  sendParmas(parmas: any): void {
    this.loading = true;
    this.sendToServer(parmas).subscribe((response: ApiResToComponent) => {
      this.loading = false;
      if (response.isComplete) this.afterSuccessPost(response);
    });
  }

  // 添加成功后操作
  afterSuccessPost(falg) {
    // 将用户关键信息传递到主控制台
    this.NzModal.destroy(falg);
  }
}
