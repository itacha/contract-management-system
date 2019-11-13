import { _HttpClient } from '@delon/theme';
import { Injectable, Injector } from '@angular/core';
import { ApiResponse, CommBasicService } from 'app/basic';
import { map } from 'rxjs/operators';
import { SFSchemaEnumType } from '@delon/form';
import { Observable } from 'rxjs';


@Injectable()
export class UsbkeyNewService extends CommBasicService {
  constructor(public injector: Injector) {
    super(injector);
  }


  findContractList(): Observable<SFSchemaEnumType[]> {
    return this.client.get(this.apiUrl.BusContract.findContractListByStatus + "?verifyStatus=1").pipe(
      map((ev: ApiResponse) => {
        if (ev.code !== '10200') {
          this.msg.error(ev.msg);
          this.log.logObj(ev, '获取合同列表', 'grey');
          return;
        } else {
          const new_items = [];
          ev.data.forEach(element => {
            new_items.push({ label: element.contractName, value: element.contractId });
          });
          return new_items;
        }
      })
    );
  }

  findContractItem(id) {
    return this.client.get(this.apiUrl.BusContract.findDetailById, { contractId: id }).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(
          ev,
          { msg: '获取合同详情', color: 'green' },
          false,
          false,
        );
      })
    );
  }
  // 根据PID等检查是否拥有授权权限
  checkPidAnSoPin(params) {
    return this.client.post(this.apiUrl.usbKey.checkUsbkey, params).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(ev, { msg: '验证授权权限', color: 'green' }, true, false);
      })
    );
  }
  // 获取签名信息
  getSign(params) {
    
    return this.client.post(this.apiUrl.usbKey.sign,params.sign ).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(ev, { msg: '获取签名信息', color: 'green' }, true, false)
      })
    )
  }
  // 保存授权相关信息
  saveUkey(params) {
    return this.client.post(this.apiUrl.usbKey.saveUkey,params).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(ev, { msg: '保存授权相关信息', color: 'green' }, true, true);
      })
    )
  }
}
