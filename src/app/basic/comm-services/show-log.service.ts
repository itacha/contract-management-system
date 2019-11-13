import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

/**
 * Log输出打印服务
 */
@Injectable()
export class ShowLogService {
  constructor() {}

  /**
   * 写有颜色标记的文字提示信息
   * @param msg
   * @param color
   */
  public logMsg(msg: string | number = '', color: string = 'red') {
    if (environment.debug) {
      console.log(`%c ${msg}`, `background:${color};color:#fff`);
    }
  }

  /**
   * 打印数据信息
   * @param obj
   * @param msg
   * @param color
   */
  public logObj(obj: any, msg: string | number = '', color: string = 'red') {
    if (environment.debug) {
      console.log(`%c ${msg} ==>>`, `background:${color};color:#fff`, obj);
      // console.log(obj);
    }
  }
}
