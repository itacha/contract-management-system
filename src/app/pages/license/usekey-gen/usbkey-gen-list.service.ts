import { _HttpClient } from '@delon/theme';
import { Injectable, Injector } from '@angular/core';
import { ApiResponse, CommBasicService } from 'app/basic';
import { map } from 'rxjs/operators';


@Injectable()
export class UsbkeyGenListService extends CommBasicService {
  constructor(public injector: Injector) {
    super(injector);
  }

  getList(params) {
    return this.client.get(this.apiUrl.BusContract.getContractList,params).pipe(
      map((ev:ApiResponse)=>{
        return this.doWithResponse(ev,{msg:'获取生成列表信息',color:'green'},true,false)
      })
    )
  }

  // 生成license
  genLisence(params) {

    return this.client.post(this.apiUrl.usbKey.exportLisence,params).pipe(
      map((ev:ApiResponse)=>{
        return this.doWithResponse(ev,{msg:'生成lisence',color:'green'},true,false)
      })
    );
  }

    // 拒绝生成license
    refuseLisence(params) {

      return this.client.post(this.apiUrl.BusContract.refuseUkey,params).pipe(
        map((ev:ApiResponse)=>{
          return this.doWithResponse(ev,{msg:'拒绝生成lisence',color:'green'},true,true)
        })
      );
    }

  // 验证Ukey是否被使用
  checkPidAnSoPin(params) {
    return this.client.post(this.apiUrl.usbKey.checkUsbkey, params).pipe(
      map((ev: ApiResponse) => {
        return this.doWithResponse(ev, { msg: '验证授权权限', color: 'green' }, true, false);
      })
    );
  }
}
