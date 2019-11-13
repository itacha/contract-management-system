import { NzModalService, ModalOptionsForService } from 'ng-zorro-antd';
import { Injectable } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { Observable } from 'rxjs';

/**
 * Modal弹出服务
 */
@Injectable()
export class ShowModalService {
  constructor(private service: NzModalService, public helper: ModalHelper) { }

  /**
   * showModalOfSuccess
   *
   * @param msg
   */
  public showModalOfSuccess(msg: any) {
    this.service.success({
      nzTitle: `操作成功！`,
      nzZIndex: 1200,
      nzContent: msg,
    });
  }

  /**
   * showModalOfErrorFromArray
   *
   * @param arraymsg
   */
  public showModalOfErrorFromArray(msg: any) {
    let str = '';
    if (msg instanceof Array) {
      for (const key in msg) {
        str += `${msg[key]}<br>`;
      }
    } else {
      str += msg;
    }
    this.showModalOfError(str);
  }

  /**
   * showModalOfError
   *
   * @param msg
   */
  public showModalOfError(msg: any) {
    this.service.error({
      nzTitle: `操作失败！`,
      nzZIndex: 1200,
      nzContent: msg,
    });
  }

  /**
   * showModalOfInfo
   *
   * @param msg
   */
  public showModalOfInfo(msg: any) {
    this.service.info({
      nzTitle: `重要提示！`,
      nzZIndex: 1200,
      nzContent: msg,
    });
  }

  /**
   * 构建静态框，点击蒙层不允许关闭
   *
   * @param comp 模态框内部结构
   * @param params 传递到模态框的参数
   * @param size 模态框尺寸
   * @param options 模态框体参数
   */
  public creatStaticModal(
    comp: any,
    params?: any,
    size: 'sm' | 'md' | 'lg' | 'xl' | '' | number = 'lg',
    options?: ModalOptionsForService,
  ): Observable<any> {
    Object.assign(options, { nzMaskClosable: false });
    return this.creatModal(
      comp,
      params,
      size,
      Object.assign({}, options),
    );
  }

  /**
   * 构建一个对话框
   *
   * @param comp 模态框内部结构
   * @param params 传递到模态框的参数
   * @param size 模态框尺寸
   * @param options 模态框体参数
   */
  public creatModal(
    comp: any,
    params?: any,
    size: 'sm' | 'md' | 'lg' | 'xl' | '' | number = 'lg',
    options?: ModalOptionsForService,
  ): Observable<any> {
    return this.helper.create(comp, params, {
      size,
      modalOptions: options,
      exact: false,
    });
  }
}
