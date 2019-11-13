import { Injectable, Injector } from '@angular/core';
import { ShowLogService } from './show-log.service';
import { NzMessageService } from 'ng-zorro-antd';
import {
  ApiResponse,
  ErrorApiRequest,
  SuccessApiRequest,
} from '../comm-datas/interface';
import { _HttpClient } from '@delon/theme';
import { ApiUrlDataService } from '../comm-datas/api-url-data.service';
import { ShowModalService } from './show-modal.service';

export interface LogAndColor {
  msg: string | number;
  color: string;
}
/**
 * 主要是对一些常用的API返回方法进行封装和再处理，规范对返回数据的处理结构
 */
@Injectable()
export class CommBasicService {
  log: ShowLogService;
  msg: NzMessageService;
  client: _HttpClient;
  apiUrl: ApiUrlDataService;
  CommModal: ShowModalService;

  constructor(public injector: Injector) {
    this.log = this.injector.get(ShowLogService);
    this.msg = this.injector.get(NzMessageService);
    this.client = this.injector.get(_HttpClient);
    this.apiUrl = this.injector.get(ApiUrlDataService);
    this.CommModal = this.injector.get(ShowModalService);
  }

  /**
   * 在API请求后，处理数据结果
   * @param ev API请求返回的结果
   * @param log 输出LOG的信息 {msg: string|number, color: string}
   * @param error_code 错误码标识
   * @param fail_msg 失败时是否提示消息
   * @param success_msg 成功时是否提供消息
   * @param fail_callback 失败时的另外的处理方式
   */
  public doWithResponse(
    ev: ApiResponse,
    log: LogAndColor = { msg: '获取数据成功', color: 'grey' },
    fail_msg: Boolean = true,
    success_msg: Boolean = false,
    error_code: string | number = '10200',
    fail_callback?: (item: any) => void,
  ) {
    this.log.logObj(ev, log.msg, log.color);
    if (ev.code !== error_code) {
      if (fail_msg) this.msg.error(ev.msg);
      if (fail_callback) fail_callback(ev);
      return new ErrorApiRequest().apireturn;
    } else {
      if (success_msg) this.msg.success(ev.msg);
      return new SuccessApiRequest(ev.data, ev.count).apireturn;
    }
  }
}
